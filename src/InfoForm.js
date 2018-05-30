import React from 'react';
import Avatar from './Avatar'
import moment from 'moment';
import md from 'markdown';
import { Form, DatePicker, TimePicker, Button, Input, Table, Modal } from 'antd';
import TaskForm from './TaskForm'
const FormItem = Form.Item;
const { TextArea } = Input;
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

const isUdf = n => n === 'undefined' ? n : ''

class InfoForm extends React.Component {
  constructor() {
    super()
    this.taskForm = React.createRef();
    this.avatar = React.createRef();
    this.qrcode = React.createRef();
    window.localStorage['username'] = isUdf(window.localStorage['username']);
    window.localStorage['wechat'] = isUdf(window.localStorage['wechat']);
    window.localStorage['qq'] = isUdf(window.localStorage['qq']);
    this.state = {
      tasks: [],
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  addTask = () => {
    let f = this.taskForm.current.getForm().getFieldsValue();
    let d = f.duration;
    f.duration = moment(d[0]).format("YYYY/MM/DD") + ' - ' + moment(d[1]).format("YYYY/MM/DD");
    f.key = this.state.tasks.length
    this.state.tasks.push(f)
    this.setState({
      tasks: this.state.tasks
    })
    this.hideModal()
  }

  deleteTask(record) {
    let tasks = this.state.tasks.filter(e => !Object.is(e, record));
    this.setState({
      tasks: tasks
    })
  }

  submit(e) {
    e.preventDefault();

    let data = this.props.form.getFieldsValue();

    data.progress = this.state.tasks;
    data.user = {
      name: data.username,
      avatar: window.localStorage['avatar']
    }
    data.info = {
      qrcode: window.localStorage['qrcode'],
      wechat: data.wechat,
      qq: data.qq
    }
    window.localStorage['username'] = data.username;
    window.localStorage['wechat'] = data.wechat;
    window.localStorage['qq'] = data.qq;

    data.date = moment(data.date).format('YYYY/MM/DD');
    data.other = (data.other || '').split('\n')
    data.problem = md.markdown.toHTML(data.problem || '')
    data.thought = md.markdown.toHTML(data.thought || '')
    data.plan = md.markdown.toHTML(data.plan || '')

    let tl = [];
    let [on, off] = [+moment(data.workon).format("HH"), +moment(data.workoff).format("HH")];

    if(on < 12) {
      tl.push({
        time: moment(data.workon).format("HH:mm")
        + ' - '
        + (off < 14 ? moment(data.workoff).format("HH:mm") : '12:00'),
        work: (data.morning || '').split('\n'),
      },)
    }

    if(off >= 14) {
      tl.push({
        time: '14:00'
        + ' - '
        + (off < 19 ? moment(data.workoff).format("HH:mm") : '18:00'),
        work: (data.afternoon || '').split('\n'),
      },)
    }

    if(off >= 19) {
      tl.push({
        time: '19:00'
        + ' - '
        + moment(data.workoff).format("HH:mm"),
        work: (data.night || '').split('\n'),
      },)
    }

    data.timeline =tl

    window.template.defaults.escape = false;

    window.document.getElementById("content").innerHTML = window.template('dr-template', data)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '进度',
      dataIndex: 'per',
      key: 'per',
    }, {
      title: '日期',
      dataIndex: 'duration',
      key: 'duration',
    }, {
      title: '操作',
      key: 'action',
      render: (record) => (
        <Button type={"danger"} onClick={this.deleteTask.bind(this, record)}>删除</Button>
      )
    }];

    return (
      <Form
        style={{ background: '#fff', padding: 24, minHeight: 280 }}
        onSubmit={this.submit.bind(this)}
      >
        <FormItem
          {...formItemLayout}
          label={"日报日期"}
        >
          {getFieldDecorator('date',{
            required: true,
            initialValue: moment(new Date())
          })(
            <DatePicker/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"日报用户名"}
        >
          {getFieldDecorator('username',{
            required: true,
            initialValue: window.localStorage['username'] || ''
          })(
          <Input placeholder={"输入你的用户名"}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"日报头像"}
        >
          {getFieldDecorator('useravatar',{
            required: false,
          })(
          <Avatar name={'avatar'}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"微信/qq二维码"}
        >
          {getFieldDecorator('qrcode',{
            required: false,
          })(
            <Avatar name={'qrcode'}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"微信号"}
        >
          {getFieldDecorator('wechat',{
            required: false,
            initialValue: window.localStorage['wechat'] || ''
          })(
          <Input placeholder={"输入你的微信号"}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"QQ"}
        >
          {getFieldDecorator('qq',{
            required: false,
            initialValue: window.localStorage['qq'] || ''
          })(
          <Input placeholder={"输入你的QQ号"}/>
          )}
          </FormItem>
        <FormItem
          {...formItemLayout}
          label={"上班时间"}
        >
          {getFieldDecorator('workon',{
            required: true,
            type: 'object',
            initialValue: moment('09:00:00', 'HH:mm:ss')
          })(
            <TimePicker/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"下班时间"}
        >
          {getFieldDecorator('workoff',{
            required: true,
            type: 'object',
            initialValue: moment('21:00:00', 'HH:mm:ss')
          })(
            <TimePicker/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"上午工作概要"}
        >
          {getFieldDecorator('morning',{
            required: false,
          })(
          <TextArea placeholder="输入上午工作概要" autosize={{ minRows: 1, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"下午工作概要"}
        >
          {getFieldDecorator('afternoon',{
            required: false,
          })(
          <TextArea placeholder="输入下午工作概要" autosize={{ minRows: 1, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"晚上工作概要"}
        >
          {getFieldDecorator('night',{
            required: false,
          })(
          <TextArea placeholder="输入晚上工作概要" autosize={{ minRows: 1, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"其他事项"}
        >
          {getFieldDecorator('other',{
            required: false,
          })(
          <TextArea placeholder="其他事项" autosize={{ minRows: 1, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"项目进度"}
        >
          <Table columns={columns} dataSource={this.state.tasks}/>
          <Button onClick={this.showModal}>添加项目进度</Button>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"遇到的问题"}
        >
          {getFieldDecorator('problem',{
            required: false,
          })(
          <TextArea placeholder={"支持简单markdown"} autosize/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"思考感悟"}
        >
          {getFieldDecorator('thought',{
            required: false,
          })(
          <TextArea placeholder={"支持简单markdown"} autosize/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={"明日计划"}
        >
          {getFieldDecorator('plan',{
            required: false,
          })(
          <TextArea placeholder={"支持简单markdown"} autosize/>
          )}
        </FormItem>
        <Modal
          title="添加项目"
          visible={this.state.visible}
          onOk={this.addTask}
          onCancel={this.hideModal}
          okText="添加"
          cancelText="取消"
        >
          <TaskForm ref={this.taskForm}/>
        </Modal>
        <FormItem>
          <Button type="primary" htmlType="submit">生成</Button>
        </FormItem>
      </Form>
    )
  }
}

let IForm = Form.create()(InfoForm);

export default IForm
