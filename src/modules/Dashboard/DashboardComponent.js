import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../Layout/Page';
import { Form, Row, Col, Input, Button, List } from 'antd';

class DashboardComponent extends React.Component {

    state = {
        loginError: false,
        output: null,
        outputList: []
    }

    findMatches(arr, num) {
        const duplicates = {};
        const res = this.getPossibleMatches(arr, num);
        return res.reduce((acc, e) => {
            const key = e.join(',');
            if (!duplicates[key]) {
                duplicates[key] = true;
                acc.push(e);
            }
            return acc;
        }, []);
    }

    getPossibleMatches(arr, num, prevSum) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const ele = arr[i];
            const sum = prevSum ? ele + prevSum : ele;
            if (sum < num) {
                const newArr = [...arr];
                newArr.splice(i, 1);
                const res = this.getPossibleMatches(newArr, num, sum);
                res.forEach(e => {
                    e.push(ele);
                    result.push(e);
                });
            }
            if (sum === num) {
                result.push([ele]);
            }

        }
        return result;

    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let arr = [parseInt(values.input1), parseInt(values.input2), parseInt(values.input3), parseInt(values.input4)];
                let total = parseInt(values.output);
                this.setState({
                    output: this.findMatches(arr, total).length,
                    outputList: this.findMatches(arr, total)
                })
            }
        });
    }
    render() {
        const { className, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Page pageHeaderText="Dashboard">
                <div className={className}>
                    <div className="main-box">
                        <Row>
                            <Col xs={24} lg={24}>
                                <Form layout="inline" onSubmit={this.onSubmitForm} className="dashboard-form">
                                    <Form.Item>
                                        {getFieldDecorator('input1', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Input1'
                                                },
                                                {
                                                    pattern: "[0-9]",
                                                    message: 'Please enter numbers only'
                                                }
                                            ],
                                        })(
                                            <Input placeholder="Input1" />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('input2', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Input2'
                                                },
                                                {
                                                    pattern: "[0-9]",
                                                    message: 'Please enter numbers only'
                                                }
                                            ],
                                        })(
                                            <Input placeholder="Input2" />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('input3', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Input3'
                                                },
                                                {
                                                    pattern: "[0-9]",
                                                    message: 'Please enter numbers only'
                                                }
                                            ],
                                        })(
                                            <Input placeholder="Input3" />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('input4', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Input4'
                                                },
                                                {
                                                    pattern: "[0-9]",
                                                    message: 'Please enter numbers only'
                                                }
                                            ],
                                        })(
                                            <Input placeholder="Input4" />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('output', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Output'
                                                },
                                                {
                                                    pattern: "[0-9]",
                                                    message: 'Please enter numbers only'
                                                }
                                            ],
                                        })(
                                            <Input placeholder="Output Value" />
                                        )}
                                    </Form.Item>
                                    <div style={{ margin: '15px 0px' }}>
                                        <Button type="primary" htmlType="submit" className="submit-button">
                                            Submit
                                            </Button>
                                    </div>
                                </Form>
                            </Col>
                            {this.state.output !== null && <Col>
                                <div>Number of ways to get output value is {this.state.output}</div>
                                {this.state.outputList.map((item, index) => (
                                    <div className="list" key={index}>{item.join(",")}</div>
                                ))}
                            </Col>
                            }
                        </Row>
                    </div>
                </div>
            </Page>
        )
    }
}

const StyledDashboardComponent = styled(DashboardComponent)`
    .main-box {
        margin-top: 60px;
    }
    .submit-button {
        background-color: #2373ef;
        border-color: #2373ef;
      }
    .list {
        border-bottom: 1px solid #e4e4d5;
        padding: 10px 0px;
      }
    `;

export default withRouter(Form.create()(StyledDashboardComponent));