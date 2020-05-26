<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddSupplier()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="供应商名称" width="300" align="center">
          <template slot-scope="scope">{{scope.row.supplierName}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
        </el-table-column>
        <el-table-column label="联系人" width="200" align="center">
          <template slot-scope="scope">{{scope.row.contractMan}}</template>
        </el-table-column>
        <el-table-column label="联系电话" width="150" align="center">
          <template slot-scope="scope">{{scope.row.contractPhone }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import {fetchList,deleteSupplier,updateSupplierStatus} from '@/api/supplier'

    export default {
        name: "supplierList",
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    pageNum: 1,
                    pageSize: 5
                },
                parentId: 0
            }
        },
        created() {
            this.getList();
        },
        watch: {
            $route(route) {
                this.getList();
            }
        },
        methods: {
            handleAddSupplier() {
                this.$router.push('/ums/addSupplier');
            },
            getList() {
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.list;
                    this.total = response.data.total;
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            handleNavStatusChange(index, row) {
                let data = new URLSearchParams();
                let ids=[];
                ids.push(row.id)
                data.append('ids',ids);
                data.append('navStatus',row.navStatus);
                updateNavStatus(data).then(response=>{
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        duration: 1000
                    });
                });
            },

            handleUpdate(index, row) {
                this.$router.push({path:'/ums/updateSupplier',query:{id:row.id}});
            },
            handleDelete(index, row) {
                this.$confirm('是否要删除该供应商', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSupplier(row.id).then(response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.getList();
                    });
                });
            }
        },
        filters: {
            statusFilter(value) {
                if (value === 0) {
                    return '停用';
                } else if (value === 1) {
                    return '启用';
                }
            }
        }
    }
</script>

<style scoped>

</style>
