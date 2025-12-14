import { AbilityConstant, UIAbility, Configuration, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
// 确保这一行的路径是正确的，且 InferenceModel 文件存在
import { InferenceModel } from '../utils/InferenceModel';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 【修改】同时打印 want 和 launchParam，彻底消除所有 "never read" 警告
    hilog.info(0x0000, 'testTag', 'Ability onCreate, want: %{public}s, launchParam: %{public}s',
      JSON.stringify(want) ?? '', JSON.stringify(launchParam) ?? '');

    // 缓存当前设备的颜色模式
    if (this.context.config) {
      AppStorage.setOrCreate('currentColorMode', this.context.config.colorMode);
      hilog.info(0x0000, 'testTag', `currentColorMode: ${this.context.config.colorMode}`);
    }

    // 异步初始化 AI 模型
    InferenceModel.init(this.context).then(() => {
      hilog.info(0x0000, 'testTag', 'AI模型预加载完成');
    }).catch((err: BusinessError) => {
      hilog.error(0x0000, 'testTag', 'AI模型预加载失败: ' + err.message);
    });
  }

  onDestroy(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/Index', (err) => {
      // 这里的 try-catch 用于消除 "Function may throw exceptions" 警告
      try {
        let windowClass = windowStage.getMainWindowSync();
        let uiContext = windowClass.getUIContext();
        AppStorage.setOrCreate('uiContext', uiContext);

        if (err.code) {
          hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
          return;
        }
        hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
      } catch (exception) {
        hilog.error(0x0000, 'testTag', 'Failed to load content with exception');
      }
    });
  }

  onConfigurationUpdate(newConfig: Configuration): void {
    AppStorage.setOrCreate('currentColorMode', newConfig.colorMode);
    hilog.info(0x0000, 'testTag', 'the newConfig.colorMode is %{public}s',
      JSON.stringify(AppStorage.get('currentColorMode')) ?? '');
  }

  onWindowStageDestroy(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }
}