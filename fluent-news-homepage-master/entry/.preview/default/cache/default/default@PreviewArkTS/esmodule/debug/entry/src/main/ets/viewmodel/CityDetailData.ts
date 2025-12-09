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
// Defining city type classes.
export class CityType {
    public name: string;
    public city: string[];
    constructor(name: string, city: string[]) {
        this.name = name;
        this.city = city;
    }
}
// Defines the keyword city class.
export class CityGroup {
    public name: string;
    public city: string[];
    constructor(name: string, city: string[]) {
        this.name = name;
        this.city = city;
    }
}
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
// City list data.
export const CITY_DATA = [
    new CityType('A', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777270, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('B', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777271, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('C', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777272, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('D', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777273, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('E', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777274, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('F', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777275, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('G', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777276, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('H', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777277, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('J', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777278, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('K', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777279, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('L', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777280, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('M', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777281, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('N', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777282, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('P', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777283, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('Q', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777284, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('R', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777285, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('S', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777286, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('T', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777287, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('W', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777288, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('X', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777289, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('Y', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777290, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityType('Z', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777291, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id))
];
// Search for keywords and related city data.
export const ALL_CITY2 = [
    new CityGroup('a', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777270, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityGroup('an', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777292, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
    new CityGroup('b', uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777271, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id)),
];
// Data of popular cities in China.
export const HOT_CITY = uiContext!.getHostContext()!.resourceManager.getStringArrayValueSync({ "id": 16777293, "type": 10009, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id);
// AlphabetIndexer Alphabetical index bar data.
export const TAB_VALUE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
