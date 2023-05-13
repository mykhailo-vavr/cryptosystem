import { FormProps } from 'antd';

export type FieldData = Parameters<Required<FormProps>['onFieldsChange']>[0][0];
