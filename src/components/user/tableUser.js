import React from 'react';
import { Table, Button, Popconfirm, Pagination } from 'antd'
import ModalTables from './formUser';
import PropTypes from 'prop-types';

const TableUsers = (props) => {

    const columns = [
        {
            title: "Mã",
            dataIndex: "code",
            width: 200
        },
        {
            title: "Họ Tên",
            dataIndex: "full_name",
            width: 200
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            width: 200
        },
        {
            title: "Địa Chỉ",
            dataIndex: "address",
            width: 200
        },
        {
            title: "Remove",
            width: 200,
            render: (record) => {
                return (
                    <Popconfirm title="Sure to delete?" onConfirm={() => _handleDelete(record)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                )
            }
        },
        {
            title: "Update",
            width: 200,
            render: (record) => {
                return (
                    <ModalTables
                        title="Edit"
                        btnDefault={false}
                        _handleSubmit={(e) => _handleUpdate(record, e)}
                    />
                )
            }
        }
    ]


    const _createUsers = async (values) => {
        await props.createListUser(values.full_name, values.phone, values.address)
        await props.readListUser(10, props.getData.pager.pageNum)
    }

    const _handleDelete = async (record) => {
        await props.deleteListUser(record.uuid);
        await props.readListUser(10, props.getData.pager.pageNum)
    };

    const _handleUpdate = async (record, values) => {

        const data = {
            uuid: record.uuid,
            full_name: values.full_name,
            phone: values.phone,
            address: values.address
        }
        await props.updateListUser(data)
        await props.readListUser(10, props.getData.pager.pageNum)
    }

    const _onChangePager = (page) => {
        props.readListUser(10, page)
    }

    return (
        <React.Fragment>
            <Table columns={columns}
                dataSource={props.getData.data}
                loading={props.loadingTable}
                pagination={false}
                rowKey="uuid"
            ></Table>
            <Pagination
                total={props.getData !== '' && props.getData.data ? props.getData.pager.total : 0} onChange={_onChangePager}
            />
            <ModalTables
                title="Add User"
                btnDefault={true}
                _handleSubmit={_createUsers}
            />
        </React.Fragment>
    )
}

TableUsers.propTypes = {
    columns: PropTypes.array,
    _createUsers: PropTypes.func,
    _handleDelete: PropTypes.func,
    _handleUpdate: PropTypes.func,
    _onChangePager: PropTypes.func,
    full_name: PropTypes.string,
    phone: PropTypes.number,
    address: PropTypes.string,
    loading: PropTypes.bool,

}
export default TableUsers;