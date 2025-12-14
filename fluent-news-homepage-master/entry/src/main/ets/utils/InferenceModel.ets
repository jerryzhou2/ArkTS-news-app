// 文件路径: entry/src/main/ets/utils/InferenceModel.ets

import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit'; // 引入 Context 类型

// 定义模型文件的结构
class ModelSchema {
  vocab: Record<string, number> = {};
  weights: number[][] = [];
  bias: number[] = [];
  classes: number[] = [];
}

export class InferenceModel {
  private static model: ModelSchema | null = null;

  /**
   * 1. 初始化：从 rawfile 读取模型文件
   */
  static async init(context: common.Context): Promise<void> {
    // 【修复1】静态方法中不能用 this，改用类名 InferenceModel
    if (InferenceModel.model !== null) {
      return;
    }

    try {
      const resourceManager = context.resourceManager;
      // 读取文件
      const fileData = await resourceManager.getRawFileContent('news_model.json');
      // 解码
      const textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
      const jsonStr = textDecoder.decodeToString(new Uint8Array(fileData.buffer));

      // 解析
      InferenceModel.model = JSON.parse(jsonStr) as ModelSchema;

      if (InferenceModel.model !== null) {
        console.info('InferenceModel: 模型加载成功');
      }
    } catch (err) {
      // 显式转换错误类型
      let error = err as BusinessError;
      console.error('InferenceModel: 模型加载失败 ' + error.message);
    }
  }

  /**
   * 2. 预测：输入标题，返回分类 ID
   */
  static predict(title: string): number {
    // 【修复1】使用类名访问静态成员
    if (InferenceModel.model === null) {
      return 0; // 模型未加载则归为"其他"
    }

    // A. 分词
    const tokens: string[] = InferenceModel.tokenize(title);

    // B. 计算每个分类的得分
    // 【修复2】ArkTS 不支持解构赋值 (const { vocab... } = ...)，必须逐个获取
    const currentModel = InferenceModel.model;
    const vocab = currentModel.vocab;
    const weights = currentModel.weights;
    const bias = currentModel.bias;
    const classes = currentModel.classes;

    // 初始化得分数组
    let scores: number[] = new Array(classes.length).fill(0);

    // 遍历每一个分类
    for (let i = 0; i < weights.length; i++) {
      let score = bias[i]; // 基础分

      for (let j = 0; j < tokens.length; j++) {
        const token = tokens[j];
        const tokenIndex = vocab[token];
        // 如果这个字/词在词表里
        if (tokenIndex !== undefined) {
          score += weights[i][tokenIndex];
        }
      }
      scores[i] = score;
    }

    // C. 找出最高分对应的分类
    let maxScore = -100000.0; // 使用具体的极小值代替 -Infinity，避免类型问题
    let maxIndex = -1;

    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > maxScore) {
        maxScore = scores[i];
        maxIndex = i;
      }
    }

    // 阈值判断：如果最高分太低，说明完全不相关，归为 0
    if (maxScore < -1.0) {
      return 0;
    }

    if (maxIndex !== -1) {
      return classes[maxIndex];
    }

    return 0;
  }

  // 字粒度分词器 (单字 + 双字)
  private static tokenize(text: string): string[] {
    const tokens: string[] = [];
    // 清洗：只保留中英文数字，使用正则替换非字符
    const cleanText = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');

    if (cleanText.length === 0) {
      return [];
    }

    // 1. 提取单字 (Unigram)
    for (let i = 0; i < cleanText.length; i++) {
      tokens.push(cleanText[i]);
    }
    // 2. 提取双字 (Bigram)
    for (let i = 0; i < cleanText.length - 1; i++) {
      tokens.push(cleanText.substring(i, i + 2));
    }
    return tokens;
  }
}