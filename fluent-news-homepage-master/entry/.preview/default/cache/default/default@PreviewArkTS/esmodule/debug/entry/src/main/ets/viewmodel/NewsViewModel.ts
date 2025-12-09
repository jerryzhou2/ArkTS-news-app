import { HomeConstants as Const } from "@bundle:com.example.newsdemo/entry/ets/constants/HomeConstants";
import type NewsTypeModel from './NewsTypeModel';
class NewsViewModel {
    getDefaultTypeList(): NewsTypeModel[] {
        return Const.TAB_BARS_DEFAULT_NEWS_TYPES;
    }
}
let newsViewModel = new NewsViewModel();
export default newsViewModel;
