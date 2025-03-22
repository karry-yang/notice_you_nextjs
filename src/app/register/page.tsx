"use client";
import React from "react";

import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

//定义提交的参数结构
type FormValues = {
  username: string;
  password: string;
};
export default function Register() {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="bg-gray-100 flex  m-4  h-full ">
      <div className=" w-24 h-24 rounded-full bg-green-200 shadow-sm flex justify-center">
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <path
            d="M624.3328 20.50048c8.192 1.00352-8.40704 64.72704 0 66.16064 8.36608 1.4336 60.86656-57.344 69.35552-55.51104 7.03488 1.52576-29.952 63.60064-22.89664 65.40288 132.7104 33.8944 266.0352 116.6336 238.80704 230.83008-1.4336 3.42016-5.96992 64.3072-13.6192 182.6816 94.67904 47.43168 112.128 126.976 52.36736 238.63296-89.66144 167.48544-145.01888 254.464-396.77952 254.464a383.81568 383.81568 0 0 1-39.56736-0.3072c-11.5712 0.768-24.76032 0.8704-39.56736 0.3072-251.76064 0-307.11808-86.97856-396.77952-254.464-59.77088-111.65696-42.31168-191.20128 52.36736-238.63296-7.64928-118.3744-12.1856-179.26144-13.6192-182.6816C87.16288 213.1968 220.48768 130.4576 353.19808 96.5632c7.0656-1.80224-29.92128-63.87712-22.8864-65.40288 8.4992-1.8432 60.98944 56.9344 69.36576 55.51104 8.3968-1.4336-8.20224-65.15712 0-66.1504 11.06944-1.36192 46.848 60.19072 57.36448 59.63776 12.29824-0.64512 4.17792-60.12928 15.39072-59.648 5.72416 0.24576 8.11008 46.1824 17.8176 59.648 5.4272 7.5264 10.57792-58.60352 17.8176-59.648 1.29024-0.18432 2.6112 0.89088 3.93216 2.87744 1.32096-1.98656 2.64192-3.06176 3.92192-2.8672 7.24992 1.03424 12.3904 67.1744 17.8176 59.63776 9.728-13.4656 12.10368-59.392 17.82784-59.648 11.2128-0.48128 3.09248 59.00288 15.39072 59.648 10.51648 0.55296 46.2848-60.99968 57.36448-59.648z"
            fill="#FCEABC"
          ></path>
          <path
            d="M100.97664 426.14784a108.61568 108.35968 90 1 0 216.71936 0 108.61568 108.35968 90 1 0-216.71936 0Z"
            fill="#B29E8F"
          ></path>
          <path
            d="M199.48544 327.40352c59.84256 0 108.35968 48.64 108.35968 108.62592a108.4416 108.4416 0 0 1-34.3552 79.33952c-13.55776 6.12352-28.61056 9.5232-44.4416 9.5232-59.8528 0-108.36992-48.62976-108.36992-108.61568a108.4416 108.4416 0 0 1 34.3552-79.33952 107.79648 107.79648 0 0 1 44.45184-9.5232z"
            fill="#3D2318"
          ></path>
          <path
            d="M159.96928 307.65056C114.0736 336.7936 77.824 372.36736 51.2 414.43328c125.1328-71.18848 210.67776-41.92256 256.64512 87.77728 29.3888-136.2944-19.90656-201.13408-147.8656-194.56z"
            fill="#F1B490"
          ></path>
          <path
            d="M715.37664 426.14784a108.61568 108.35968 90 1 0 216.71936 0 108.61568 108.35968 90 1 0-216.71936 0Z"
            fill="#B29E8F"
          ></path>
          <path
            d="M833.19808 327.40352c-59.84256 0-108.35968 48.64-108.35968 108.62592a108.4416 108.4416 0 0 0 34.3552 79.33952c13.568 6.12352 28.61056 9.5232 44.45184 9.5232 59.84256 0 108.35968-48.62976 108.35968-108.61568a108.4416 108.4416 0 0 0-34.3552-79.33952 107.79648 107.79648 0 0 0-44.4416-9.5232z"
            fill="#3D2318"
          ></path>
          <path
            d="M872.9088 307.65056c45.89568 29.1328 82.15552 64.7168 108.76928 106.78272-125.1328-71.18848-210.67776-41.92256-256.64512 87.77728-29.3888-136.2944 19.90656-201.13408 147.8656-194.56z"
            fill="#F1B490"
          ></path>
          <path
            d="M183.54176 613.4272l57.62048 30.1056c45.5168 55.6032 134.59456 106.1888 267.2128 151.7568v-254.7712c-128.41984 17.67424-213.7088 31.232-255.87712 40.704-42.15808 9.45152-65.13664 20.19328-68.95616 32.2048z m649.92256 0l-57.62048 30.1056c-45.5168 55.6032-134.59456 106.1888-267.2128 151.7568v-254.7712c128.41984 17.67424 213.7088 31.232 255.87712 40.704 42.15808 9.45152 65.13664 20.19328 68.95616 32.2048z"
            fill="#C7927D"
          ></path>
          <path
            d="M614.94272 481.28v46.6432c46.90944 16.4352 84.9408 27.53536 114.0736 33.28 29.1328 5.76512 71.81312 10.60864 128.06144 14.5408v41.05216l-76.8512-13.43488c-94.91456 83.64032-177.24416 130.37568-246.9888 140.22656a78.67392 78.67392 0 0 1-18.28864 1.97632c-1.4848 0-2.99008-0.02048-4.48512-0.0512-1.51552 0.03072-3.01056 0.0512-4.5056 0.0512a78.5408 78.5408 0 0 1-18.26816-1.97632c-69.75488-9.85088-152.08448-56.58624-246.99904-140.22656L163.84 616.79616v-41.0624c56.23808-3.92192 98.92864-8.76544 128.06144-14.52032 29.1328-5.75488 67.16416-16.85504 114.0736-33.29024V481.28l104.47872 13.49632L614.94272 481.28z"
            fill="#E4B29E"
          ></path>
          <path
            d="M405.66784 669.7472c18.81088 2.99008 37.30432-114.04288 18.49344-117.03296-18.80064-2.99008-38.1952 20.7872-43.29472 53.11488-5.10976 32.31744 6.00064 60.928 24.80128 63.91808z m205.4144 0c-18.80064 2.99008-37.29408-114.04288-18.4832-117.03296 18.80064-2.99008 38.1952 20.7872 43.29472 53.11488 5.10976 32.31744-6.00064 60.928-24.81152 63.91808z"
            fill="#5F5657"
            fillOpacity=".8"
          ></path>
          <path
            d="M813.03552 613.61152c52.6848 0 95.3856-18.15552 95.3856-40.56064 0-22.40512-42.7008-40.57088-95.3856-40.57088-52.67456 0-95.3856 18.16576-95.3856 40.57088s42.7008 40.56064 95.3856 40.56064z m-615.24992 0c52.67456 0 95.37536-18.15552 95.37536-40.56064 0-22.40512-42.7008-40.57088-95.37536-40.57088C145.1008 532.48 102.4 550.64576 102.4 573.05088s42.7008 40.56064 95.3856 40.56064z"
            fill="#E75050"
            fillOpacity=".3"
          ></path>
        </svg>
       
      </div>
      <div className="flex-1  flex-col justify-center ">
        <h1 className="text-center text-lg text-blue-500 font-bold ">
          欢迎注册
        </h1>
        <div className="w-full ">
          <div className=" flex-1 w-8/10 flex justify-center ">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
        className="w-2/5 flex-col justify-center"
              scrollToFirstError
              labelAlign="left"
            >
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="密码"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="nickname"
                label="昵称"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="手机"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="gender"
                label="性别"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="验证码" extra="验证码不能为空">
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      name="captcha"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "输入邮箱验证码",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Button>获取验证码</Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  同意 <a href="">协议</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
       
      </div>
      <div><span>已有账号？</span><Button>登录</Button></div>
    </div>
  );
}
