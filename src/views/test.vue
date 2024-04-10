//基础使用方式，仅展示表格内容以及实现操作
<template>
  <div style="width: 900px;height: 400px" >
    <Table :tableData="tableData">
      <TableColumn prop="id" label="序号" width="100px" fixed="left"></TableColumn>
      <TableColumn prop="orderNumber" label="订单编号" width="180px" sort></TableColumn>
      <TableColumn prop="customerName" label="购买人" width="80px"></TableColumn>
      <TableColumn prop="contactInformation" label="联系方式" width="80px"></TableColumn>
      <TableColumn prop="orderDate" label="创建时间" width="100px"></TableColumn>
      <TableColumn prop="orderDate" label="创建时间" width="100px"></TableColumn>
      <TableColumn prop="orderDate" label="创建时间" width="100px"></TableColumn>
      <TableColumn prop="orderDate" label="创建时间" width="100px"></TableColumn>
      <TableColumn prop="orderDate" label="创建时间" width="100px"></TableColumn>
      <TableColumn prop="paymentDate" label="支付时间" width="100px" ></TableColumn>
      <TableColumn prop="operation" label="操作" width="200px">
        <template >
          <button style="color: red" @click="handleClick()" type="text">查看</button>
          <component :is="config.name"
                     :options="config.options"
                     :label="config.label"
                     :keyName="config.keyName"
                     style="margin-left: 20px">
          </component>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>

<script>
import TableColumn from "../components/TableNew/TableColumn.vue";
import DropdownMenu from "../components/DropdownMenu/DropdownMenu.vue";
export default {
  components: {
    TableColumn,
    DropdownMenu
  },
  data() {
    return {
      config: {
        name:'DropdownMenu',
        options: [
          { id: 1, name: "选项一", description: "这是选项一的描述" ,handler: this.handleOtherMethod_1},
          { id: 2, name: "选项二", description: "这是选项二的描述" ,handler: this.handleOtherMethod_2},
          { id: 3, name: "选项三", description: "这是选项三的描述" ,handler: this.handleOtherMethod_3}
        ],
        label: 'name',
        keyName: 'description',
      },
      tableData1:[],
      tableData: [
        {
          id: 1,
          orderNumber: 'ORD0000000000001',
          customerName: 'Jane ',
          contactInformation: 'jane. @example.com',
          totalAmount: 2510.0,
          orderDate: '2023-08-11',
          paymentDate: '2023-08-11',
          status: 'Completed',
          tag:'AB-1'
        },
        {
          id: 2,
          orderNumber: 'ORD0000000000002',
          customerName: 'Jane Smith',
          contactInformation: 'jane.smith@example.com',
          totalAmount: 250.0,
          orderDate: '2023-08-11',
          paymentDate: '2023-08-12',
          status: 'Completed',
          tag:'AB-2'
        },{
          id: 2,
          orderNumber: 'ORD0000000000002',
          customerName: 'Jane Smith',
          contactInformation: 'jane.smith@example.com',
          totalAmount: 250.0,
          orderDate: '2023-08-11',
          paymentDate: '2023-08-12',
          status: 'Completed',
          tag:'AB-2'
        },{
          id: 2,
          orderNumber: 'ORD0000000000002',
          customerName: 'Jane Smith',
          contactInformation: 'jane.smith@example.com',
          totalAmount: 250.0,
          orderDate: '2023-08-11',
          paymentDate: '2023-08-12',
          status: 'Completed',
          tag:'AB-2'
        },{
          id: 2,
          orderNumber: 'ORD0000000000002',
          customerName: 'Jane Smith',
          contactInformation: 'jane.smith@example.com',
          totalAmount: 250.0,
          orderDate: '2023-08-11',
          paymentDate: '2023-08-12',
          status: 'Completed',
          tag:'AB-2'
        },
        {
          id: 3,
          orderNumber: 'ORD-000',
          customerName: '张三111',
          contactInformation: '张三的联系方式',
          totalAmount: '$100.00',
          orderDate: '2023-08-01',
          paymentDate: '2023-08-02',
          status: '已完成',
          tag: '标签1'
        },
        {
          id: 3,
          orderNumber: 'ORD-001',
          customerName: '张三',
          contactInformation: '张三的联系方式',
          totalAmount: '$100.00',
          orderDate: '2023-08-01',
          paymentDate: '2023-08-02',
          status: '已完成',
          tag: '标签1'
        },

      ],
      registeredColumns: [],
    };
  },
  methods: {
    handleClick() {
      // 处理查看按钮点击事件
      console.log('事件点击');
    },
  },
};
</script>