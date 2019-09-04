<template>
  <page-main>
    <page-section title="基础表格">
      <a-table :columns="basicTable.columns" :dataSource="basicTable.data" bordered></a-table>
    </page-section>
    <page-section title="表格头单独设置">
      <a-table :columns="basicTable.columns" :dataSource="basicTable.data" bordered></a-table>
    </page-section>
    <page-section title="统一列设置">
      <a-table :columns="basicTable.columns" :dataSource="basicTable.data" bordered></a-table>
    </page-section>
  </page-main>
</template>

<script>
export default {
  name: 'tableIndex',
  data () {
    return {
      basicTable: {
        columns: [
          {
            title: 'Name',
            dataIndex: 'name'
          }, {
            title: 'Cash Assets',
            dataIndex: 'money'
          }, {
            title: 'Address',
            dataIndex: 'address'
          }
        ],
        data: [
          {
            key: '1',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York No. 1 Lake Park'
          }, {
            key: '2',
            name: 'Jim Green',
            money: '￥1,256,000.00',
            address: 'London No. 1 Lake Park'
          }, {
            key: '3',
            name: 'Joe Black',
            money: '￥120,000.00',
            address: 'Sidney No. 1 Lake Park'
          }
        ]
      }
    }
  }
}
</script>
