/*
* Copyright (c) 2024 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { CommonConstants } from '../constants/CommonConstants';
import { userAuthUtil, CurrentUser } from '../utils/UserAuthUtil';
import { promptAction } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { UserSettingsView } from './UserSettingsView';
import { ChangePasswordView } from './ChangePasswordView';

@Component
export struct MyProfileView {
  @StorageProp('isLoggedIn') isLoggedIn: boolean = false;
  @StorageProp('currentUser') currentUser: CurrentUser | null = null;
  @State showLogin: boolean = true; // true: 登录界面, false: 注册界面
  @State showSettings: boolean = false;
  @State showChangePassword: boolean = false;
  @State username: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
  @State email: string = '';
  @State isLoading: boolean = false;

  aboutToAppear() {
    // 初始化用户认证工具
    const context = this.getUIContext().getHostContext();
    if (context) {
      userAuthUtil.checkLoginStatus(context);
    }
  }

  build() {
    Column() {
      if (this.showChangePassword && this.isLoggedIn) {
        // 显示修改密码页面
        Column() {
          // 顶部标题栏
          Row() {
            Text($r('app.string.change_password_button'))
              .fontSize(20)
              .fontWeight(CommonConstants.FONT_WEIGHT_500)
              .fontColor(Color.Black)
              .width(CommonConstants.FULL_PERCENT)
              .textAlign(TextAlign.Center)
          }
          .width(CommonConstants.FULL_PERCENT)
          .height(60)
          .padding({ left: 16, right: 16 })
          .backgroundColor(Color.White)
          .justifyContent(FlexAlign.Center)

          ChangePasswordView({
            onClose: () => {
              this.showChangePassword = false;
            }
          })
        }
        .width(CommonConstants.FULL_PERCENT)
        .height(CommonConstants.FULL_PERCENT)
        .backgroundColor('#F5F5F5')
      } else if (this.showSettings && this.isLoggedIn) {
        // 显示资料设置页面
        Column() {
          // 顶部标题栏
          Row() {
            Text($r('app.string.account_settings'))
              .fontSize(20)
              .fontWeight(CommonConstants.FONT_WEIGHT_500)
              .fontColor(Color.Black)
              .width(CommonConstants.FULL_PERCENT)
              .textAlign(TextAlign.Center)
          }
          .width(CommonConstants.FULL_PERCENT)
          .height(60)
          .padding({ left: 16, right: 16 })
          .backgroundColor(Color.White)
          .justifyContent(FlexAlign.Center)

          UserSettingsView({
            onClose: () => {
              this.showSettings = false;
            }
          })
        }
        .width(CommonConstants.FULL_PERCENT)
        .height(CommonConstants.FULL_PERCENT)
        .backgroundColor('#F5F5F5')
      } else if (this.isLoggedIn && this.currentUser) {
        // 已登录：显示用户信息
        this.LoggedInView()
      } else {
        // 未登录：显示登录/注册界面
        this.LoginRegisterView()
      }
    }
    .width(CommonConstants.FULL_PERCENT)
    .height(CommonConstants.FULL_PERCENT)
    .backgroundColor('#F5F5F5')
    .padding({ top: 40, left: 20, right: 20 })
  }

  @Builder
  LoggedInView() {
    Column() {
      // 用户信息区域
      Column() {
        Text(this.currentUser?.username || '用户')
          .fontSize(24)
          .fontWeight(CommonConstants.FONT_WEIGHT_500)
          .fontColor(Color.Black)
          .margin({ bottom: 8 })

        if (this.currentUser?.email) {
          Text(this.currentUser.email)
            .fontSize(14)
            .fontColor(Color.Gray)
            .margin({ bottom: 30 })
        }
      }
      .width(CommonConstants.FULL_PERCENT)
      .margin({ top: 40, bottom: 40 })

      // 资料设置按钮
      Button($r('app.string.account_settings'))
        .width(CommonConstants.NINETY_PERCENT)
        .height(50)
        .backgroundColor('#007AFF')
        .fontColor(Color.White)
        .fontSize(18)
        .fontWeight(CommonConstants.FONT_WEIGHT_500)
        .borderRadius(8)
        .onClick(() => {
          this.showSettings = true;
        })
        .margin({ top: 20 })

      // 修改密码按钮
      Button($r('app.string.change_password_button'))
        .width(CommonConstants.NINETY_PERCENT)
        .height(50)
        .backgroundColor('#007AFF')
        .fontColor(Color.White)
        .fontSize(18)
        .fontWeight(CommonConstants.FONT_WEIGHT_500)
        .borderRadius(8)
        .onClick(() => {
          this.showChangePassword = true;
        })
        .margin({ top: 16 })

      // 登出按钮
      Button($r('app.string.logout_button'))
        .width(CommonConstants.NINETY_PERCENT)
        .height(50)
        .backgroundColor('#FF3B30')
        .fontColor(Color.White)
        .fontSize(18)
        .fontWeight(CommonConstants.FONT_WEIGHT_500)
        .borderRadius(8)
        .onClick(async () => {
          await this.handleLogout();
        })
        .margin({ top: 16 })
    }
    .width(CommonConstants.FULL_PERCENT)
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Center)
  }

  @Builder
  LoginRegisterView() {
    Column() {
      // 标题
      Text(this.showLogin ? $r('app.string.login_title') : $r('app.string.register_title'))
        .fontSize(32)
        .fontWeight(CommonConstants.FONT_WEIGHT_500)
        .fontColor(Color.Black)
        .margin({ top: 40, bottom: 40 })

      // 用户名输入框
      TextInput({ placeholder: $r('app.string.username_placeholder'), text: this.username })
        .width(CommonConstants.NINETY_PERCENT)
        .height(50)
        .margin({ bottom: 16 })
        .backgroundColor(Color.White)
        .borderRadius(8)
        .padding({ left: 16, right: 16 })
        .onChange((value: string) => {
          this.username = value;
        })

      // 注册时显示邮箱输入框
      if (!this.showLogin) {
        TextInput({ placeholder: $r('app.string.email_placeholder'), text: this.email })
          .width(CommonConstants.NINETY_PERCENT)
          .height(50)
          .margin({ bottom: 16 })
          .backgroundColor(Color.White)
          .borderRadius(8)
          .padding({ left: 16, right: 16 })
          .type(InputType.Email)
          .onChange((value: string) => {
            this.email = value;
          })
      }

      // 密码输入框
      TextInput({
        placeholder: $r('app.string.password_placeholder'),
        text: this.password
      })
        .width(CommonConstants.NINETY_PERCENT)
        .height(50)
        .backgroundColor(Color.White)
        .borderRadius(8)
        .padding({ left: 16, right: 16 })
        .type(InputType.Password)
        .onChange((value: string) => {
          this.password = value;
        })
        .margin({ bottom: 16 })

      // 注册时显示确认密码输入框
      if (!this.showLogin) {
        TextInput({
          placeholder: $r('app.string.confirm_password_placeholder'),
          text: this.confirmPassword
        })
          .width(CommonConstants.NINETY_PERCENT)
          .height(50)
          .backgroundColor(Color.White)
          .borderRadius(8)
          .padding({ left: 16, right: 16 })
          .type(InputType.Password)
          .onChange((value: string) => {
            this.confirmPassword = value;
          })
          .margin({ bottom: 24 })
      } else {
        Blank()
          .height(24)
      }

      // 登录/注册按钮
      Button(this.showLogin ? $r('app.string.login_button') : $r('app.string.register_button'))
        .width(CommonConstants.NINETY_PERCENT)
        .height(50)
        .backgroundColor('#007AFF')
        .fontColor(Color.White)
        .fontSize(18)
        .fontWeight(CommonConstants.FONT_WEIGHT_500)
        .borderRadius(8)
        .enabled(!this.isLoading && this.isFormValid())
        .opacity(this.isFormValid() && !this.isLoading ? 1 : 0.6)
        .onClick(async () => {
          if (this.showLogin) {
            await this.handleLogin();
          } else {
            await this.handleRegister();
          }
        })
        .margin({ bottom: 20 })

      // 切换登录/注册
      Row() {
        Text(this.showLogin ? $r('app.string.no_account') : $r('app.string.have_account'))
          .fontSize(14)
          .fontColor(Color.Gray)

        Text(this.showLogin ? $r('app.string.register_link') : $r('app.string.login_link'))
          .fontSize(14)
          .fontColor('#007AFF')
          .onClick(() => {
            this.showLogin = !this.showLogin;
            // 清空表单
            this.username = '';
            this.password = '';
            this.confirmPassword = '';
            this.email = '';
          })
      }
      .margin({ top: 20 })

      if (this.isLoading) {
        LoadingProgress()
          .color('#007AFF')
          .width(30)
          .height(30)
          .margin({ top: 20 })
      }
    }
    .width(CommonConstants.FULL_PERCENT)
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Center)
  }

  isFormValid(): boolean {
    if (this.showLogin) {
      return this.username.trim().length > 0 && this.password.trim().length > 0;
    } else {
      return this.username.trim().length > 0 &&
        this.password.trim().length >= 6 &&
        this.confirmPassword.trim().length > 0 &&
        this.password === this.confirmPassword;
    }
  }

  async handleLogin() {
    if (this.username.trim().length === 0 || this.password.trim().length === 0) {
      try {
        await promptAction.showToast({
          message: $r('app.string.empty_fields'),
          duration: 2000
        });
      } catch (err) {
        const error = err as BusinessError;
        console.error(`showToast error: ${error.message}`);
      }
      return;
    }

    this.isLoading = true;
    const context = this.getUIContext().getHostContext();

    if (context) {
      const success = await userAuthUtil.loginUser(context, this.username.trim(), this.password.trim());
      this.isLoading = false;

      if (success) {
        try {
          await promptAction.showToast({
            message: $r('app.string.login_success'),
            duration: 2000
          });
        } catch (err) {
          const error = err as BusinessError;
          console.error(`showToast error: ${error.message}`);
        }
        // 清空表单
        this.username = '';
        this.password = '';
      } else {
        try {
          await promptAction.showToast({
            message: $r('app.string.login_failed'),
            duration: 2000
          });
        } catch (err) {
          const error = err as BusinessError;
          console.error(`showToast error: ${error.message}`);
        }
      }
    } else {
      this.isLoading = false;
      try {
        await promptAction.showToast({
          message: $r('app.string.login_error'),
          duration: 2000
        });
      } catch (err) {
        const error = err as BusinessError;
        console.error(`showToast error: ${error.message}`);
      }
    }
  }

  async handleRegister() {
    if (this.username.trim().length === 0) {
      try {
        await promptAction.showToast({
          message: $r('app.string.username_required'),
          duration: 2000
        });
      } catch (err) {
        const error = err as BusinessError;
        console.error(`showToast error: ${error.message}`);
      }
      return;
    }

    if (this.password.trim().length < 6) {
      try {
        await promptAction.showToast({
          message: $r('app.string.password_length_error'),
          duration: 2000
        });
      } catch (err) {
        const error = err as BusinessError;
        console.error(`showToast error: ${error.message}`);
      }
      return;
    }

    if (this.password !== this.confirmPassword) {
      try {
        await promptAction.showToast({
          message: $r('app.string.password_mismatch'),
          duration: 2000
        });
      } catch (err) {
        const error = err as BusinessError;
        console.error(`showToast error: ${error.message}`);
      }
      return;
    }

    this.isLoading = true;
    const context = this.getUIContext().getHostContext();

    if (context) {
      const success = await userAuthUtil.registerUser(context, {
        username: this.username.trim(),
        password: this.password.trim(),
        email: this.email.trim()
      });
      this.isLoading = false;

      if (success) {
        try {
          await promptAction.showToast({
            message: $r('app.string.register_success'),
            duration: 2000
          });
        } catch (err) {
          const error = err as BusinessError;
          console.error(`showToast error: ${error.message}`);
        }
        // 注册成功后切换到登录界面
        this.showLogin = true;
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.email = '';
      } else {
        try {
          await promptAction.showToast({
            message: $r('app.string.register_failed'),
            duration: 2000
          });
        } catch (err) {
          const error = err as BusinessError;
          console.error(`showToast error: ${error.message}`);
        }
      }
    } else {
      this.isLoading = false;
      try {
        await promptAction.showToast({
          message: $r('app.string.register_error'),
          duration: 2000
        });
      } catch (err) {
        const error = err as BusinessError;
        console.error(`showToast error: ${error.message}`);
      }
    }
  }

  async handleLogout() {
    await userAuthUtil.logoutUser();
    try {
      await promptAction.showToast({
        message: $r('app.string.logout_success'),
        duration: 2000
      });
    } catch (err) {
      const error = err as BusinessError;
      console.error(`showToast error: ${error.message}`);
    }
    // 清空表单
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.showLogin = true;
  }
}