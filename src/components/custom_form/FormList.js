import { inputConf } from "./control/Input";
import { selectConf } from "./control/Select";
import { radioConf } from "./control/Radio";
import { checkBoxConf } from "./control/CheckBox";
import { cascaderConf } from "./control/Cascader";
import { textConf } from "./control/Text";
import { titleConf } from "./control/Title";
import { hrConf } from "./control/Hr";
import { pConf } from "./control/P";
import { uploadsConf } from './control/Uploads';
import { datePickerConf } from './control/DatePicker'
import { addressConf } from './control/Address';

const formList = {
  Title: titleConf,
  Hr: hrConf,
  P: pConf,
  Input: inputConf,
  Select: selectConf,
  Radio: radioConf,
  CheckBox: checkBoxConf,
  DatePicker: datePickerConf,
  Cascader: cascaderConf,
  Address: addressConf,
  Uploads: uploadsConf,
  Text: textConf,
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}
// console.log(formList)
export default list_arr;
