import React from 'react';
import { Form, DatePicker, Input, InputNumber } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class TaskForm extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
          <Form ref={this.taskForm}>
            <FormItem
              {...formItemLayout}
              label={"项目标题"}
            >
              {getFieldDecorator("title", {
                required: true
              })(
              <Input name={"title"}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={"项目进度"}
            >
              {getFieldDecorator("per", {
                initialValue: 0,
                required: true
              })(
                <InputNumber
                  name={"per"}
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={"项目日期"}
            >
              {getFieldDecorator("duration", {
                type: 'array',
                initialValue: 0,
                required: true
              })(
              <RangePicker name={"duration"} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={"项目描述"}
            >
              {getFieldDecorator("desc", {
                required: true
              })(
                <Input name={"desc"}/>
              )}
            </FormItem>
          </Form>
    )
  }
}

let TForm = Form.create()(TaskForm);

export default TForm
