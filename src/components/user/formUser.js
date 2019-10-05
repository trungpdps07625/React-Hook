import React, { useState } from 'react';
import { Form, Button, Modal, Input } from 'antd'

const ModalTable = (props) => {

    const [visible, setvisible] = useState(false);


    const _handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                return props._handleSubmit(values)

            }
            console.log(values);

        });
        setvisible(false)
    };


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const setVisible = () => {
        setvisible(false)
    }
    const showModal = () => {
        setvisible(true)
    };


    const { getFieldDecorator } = props.form;
    return (
        <React.Fragment>
            {
                props.btnDefault ?
                    <Button type="primary" onClick={showModal}>
                        {props.title}
                    </Button> : <Button type="primary" onClick={showModal}>
                        {props.title}
                    </Button>
            }
            <Modal
                title="Create User"
                visible={visible}
                onOk={_handleSubmit}
                onCancel={setVisible}
            >
                <Form {...formItemLayout} onSubmit={_handleSubmit}>

                    <Form.Item label="FullName">
                        {getFieldDecorator('full_name', {
                            rules: [{ required: true, message: 'Please input your Full Name!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input style={{ width: '100%' }} />)}
                    </Form.Item>

                    <Form.Item label="address">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>

                </Form>
            </Modal>
        </React.Fragment>

    )
}
const ModalTables = Form.create('form')(ModalTable);
export default ModalTables;