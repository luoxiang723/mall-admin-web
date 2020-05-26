<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="supplier"
             :rules="rules"
             ref="supplierFrom"
             label-width="150px">
      <el-form-item label="供应商名称：" prop="supplierName">
        <el-input v-model="supplier.supplierName"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-radio-group v-model="supplier.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="supplier.contractMan"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话：">
        <el-input v-model="supplier.contractPhone"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('supplierFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('supplierFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
    import {fetchList, createSupplier, updateSupplier, getSupplier} from '@/api/supplier';

    const defaultSupplier = {
        supplierName: '',
        status: 0,
        contractMan: '',
        contractPhone: ''
    };
    export default {
        name: "SupplierDetail",
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                supplier: Object.assign({}, defaultSupplier),
                rules: {
                    supplierName: [
                        {required: true, message: '请输入供应商名称', trigger: 'blur'},
                        {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
                    ]
                },
                filterAttrs: []
            }
        },
        created() {
            if (this.isEdit) {
                getSupplier(this.$route.query.id).then(response => {
                    this.supplier = response.data;
                });
            } else {
                this.supplier = Object.assign({}, defaultSupplier);
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if (this.isEdit) {
                                updateSupplier(this.$route.query.id, this.supplier).then(response => {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.$router.back();
                                });
                            } else {
                                createSupplier(this.supplier).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.resetForm(formName);
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                });
                            }
                        });

                    } else {
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.supplier = Object.assign({}, defaultSupplier);
            }
        },
        filters: {
            filterLabelFilter(index) {
                if (index === 0) {
                    return '筛选属性：';
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>

</style>
