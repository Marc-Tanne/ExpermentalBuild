import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, InputNumber, DatePicker, Button, message } from 'antd';
import { buyActionCreator } from '../redux/buy/actions';

const FormItem = Form.Item;
const BuyForm = Form.create()(
  (props) => {
    const {form, submit} = props;
    const {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
      },
    };
    return (
      <Form
        {...formItemLayout}
        style={styles.form}
        onSubmit={submit}
      >
        <FormItem
          {...formItemLayout}
          label='Number'
          hasFeedback
        >
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                message: 'Please enter a number'
              },
              {
                type: 'integer',
                message: 'Please enter a valid Integer'
              }
            ]
          })(
            <InputNumber placeholder={1} min={1} max={50} style={styles.input} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Buy Date'
          hasFeedback
        >
          {getFieldDecorator('buyDate', {
            rules: [
              {
                required: true,
                message: 'Please pick a date'
              }
            ]
          })(
            <DatePicker style={styles.input} format={'YYYY-MM-DD'} />
          )}
        </FormItem>
        <Form.Item hasFeedback>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
);

class Buy extends Component {
// There is no need for a constructor function for this class. So we will use the implicit declaration.

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.success === true) {
      message.success('Inventory Updated');
    }
    if (this.props.error === true) {
      message.error(this.props.message);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.buyDate = values.buyDate.format('YYYY-MM-DD');
        this.props.buyActionCreator(values);
        this.form.resetFields();
      }
    });
  }

  render() {
    return (
      <div>
        <BuyForm
          ref={(form) => this.form = form}
          submit={this.onSubmit}
        />
      </div>
    )
  }
}

const styles = {
  form: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: 400
  },
  input: {
    marginTop: 0,
    textAlign: 'center',
    minWidth: 200
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.buy.success,
    error: state.buy.error,
    message: state.buy.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyActionCreator: (values) => dispatch(buyActionCreator(values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy);
