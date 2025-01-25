import { FC, useCallback, useEffect } from 'react';
import { download, readFile } from '@/utils';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import { Button, Upload, TextArea, Input } from '@/components/UI/atoms';
import { FormItem, RadioGroup } from '@/components/UI/molecules';
import { useToggleWrapper, useApp, useFormFieldsSchema, useYupSchema } from '@/hooks';
import { ActionsEnum, FieldData, SaveAsEnum } from '@/types';
import { CipherFormWrapper } from './styles';
import { CipherFormProps } from './types';
import { initialValues, actionOptions, saveAsOptions } from './settings';
import FrequencyTable from '../FrequencyTable';
import TestResults from '../TestResults';
import Form from '../Form';
import AttackResults from '../AttackResults';

const CipherForm: FC<CipherFormProps> = ({
  children,
  title,
  form,
  onChange,
  encode,
  decode,
  test,
  attack,
  fieldsToShow,
}) => {
  const { modal } = useApp();
  const [toggleLoadingWrapper, loading] = useToggleWrapper();

  const { string, required } = useFormFieldsSchema();

  const schema = useYupSchema({
    alphabet: required(string.matches(/^(?:([A-Za-z])(?!.*\1))*$/, 'Characters should be unique')),
  });

  const onFieldsChange = useCallback(
    (changedFields: FieldData[]) => {
      const asyncWrapper = async () => {
        if (changedFields[0].name.toString() === 'alphabet') {
          try {
            await form.validateFields();
          } catch {
            return;
          }
        }

        onChange(changedFields);
      };

      asyncWrapper().catch(() => {});
    },
    [form, onChange],
  );

  useEffect(() => {
    if (!encode) {
      return;
    }

    const { text, alphabet } = form.getFieldsValue();
    form.setFieldValue('cipher', encode(text, alphabet));
  }, [encode, form]);

  useEffect(() => {
    if (!decode) {
      return;
    }

    const { cipher, alphabet } = form.getFieldsValue();
    form.setFieldValue('text', decode(cipher, alphabet));
  }, [decode, form]);

  const beforeUpload = useCallback((file: RcFile) => file.size / 1024 ** 2 < 1, []);

  const openFile = toggleLoadingWrapper((info: UploadChangeParam) => {
    const file = info.file?.originFileObj;

    if (info.file.status !== 'done' || !file) {
      return;
    }

    readFile(file)
      .then((data) => {
        const { alphabet, action } = form.getFieldsValue();

        const actions = {
          [ActionsEnum.ENCODE]: (text: string) =>
            form.setFieldsValue({ cipher: encode && encode(text, alphabet), text }),
          [ActionsEnum.DECODE]: (text: string) =>
            form.setFieldsValue({ cipher: text, text: decode && decode(text, alphabet) }),
        };

        actions[action](String(data));
      })
      .catch(console.error);
  });

  const saveFile = toggleLoadingWrapper(() => {
    const { text, cipher, action, saveAs = SaveAsEnum.TEXT } = form.getFieldsValue();
    const data = action === ActionsEnum.ENCODE ? cipher : text;
    const name = `${action}d-${Date.now()}`;

    download(data, name, saveAs);
  });

  const showFrequencyTable = toggleLoadingWrapper(() => {
    const { text } = form.getFieldsValue();

    modal.info({
      content: <FrequencyTable text={text} />,
      icon: null,
      closable: true,
    });
  });

  const showTestResults = toggleLoadingWrapper(() => {
    if (!test) {
      return;
    }

    const { encodingResults, decodingResults } = test();
    const results = [...encodingResults, ...decodingResults];

    modal.info({
      content: <TestResults results={results} />,
      icon: null,
      closable: true,
    });
  });

  const showAttackResults = toggleLoadingWrapper(() => {
    if (!attack) {
      return;
    }

    const { cipher, alphabet } = form.getFieldsValue();
    const results = attack(cipher, alphabet);

    modal.info({
      getContainer: 'Test',
      content: <AttackResults results={results} />,
      icon: null,
      closable: true,
    });
  });

  return (
    <CipherFormWrapper>
      <h2 className="title">{title}</h2>
      <Form
        layout="vertical"
        form={form}
        onFieldsChange={onFieldsChange}
        initialValues={initialValues}
        disabled={loading}
      >
        {fieldsToShow?.action !== false && (
          <FormItem name="action" label="Type">
            <RadioGroup options={actionOptions} />
          </FormItem>
        )}
        {fieldsToShow?.text !== false && (
          <FormItem name="text" label="Text">
            <TextArea rows={4} />
          </FormItem>
        )}
        {fieldsToShow?.cipher !== false && (
          <FormItem name="cipher" label="Encrypted text">
            <TextArea rows={4} />
          </FormItem>
        )}
        {fieldsToShow?.alphabet !== false && (
          <FormItem name="alphabet" label="Alphabet" schema={schema}>
            <Input />
          </FormItem>
        )}

        {children}

        {fieldsToShow?.saveAs && (
          <FormItem name="saveAs" label="Save as">
            <RadioGroup options={saveAsOptions} />
          </FormItem>
        )}
      </Form>
      <div className="row">
        <Button onClick={saveFile}>Save file</Button>
        <Upload onChange={openFile} beforeUpload={beforeUpload} showUploadList={false} maxCount={1}>
          <Button disabled={loading}>Open file</Button>
        </Upload>
        <Button onClick={showFrequencyTable} disabled={loading}>
          Show frequency table
        </Button>
        {test && (
          <Button onClick={showTestResults} disabled={loading}>
            Test
          </Button>
        )}
        {attack && (
          <Button onClick={showAttackResults} disabled={loading}>
            Attack
          </Button>
        )}
      </div>
    </CipherFormWrapper>
  );
};

export default CipherForm;
