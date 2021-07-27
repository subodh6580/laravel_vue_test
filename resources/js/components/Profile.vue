
<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header p-2">
                            Profile
                        </div><!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">

                                <!-- Setting Tab -->
                                <div class="tab-pane active show" id="settings">
                                    <form @click.prevent="updateInfo" class="form-horizontal">
                                        <div class="form-group">
                                            <label for="inputName" class="col-sm-2 control-label">Name</label>

                                            <div class="col-sm-12">
                                            <input type="" v-model="form.name" class="form-control" id="inputName" placeholder="Name" :class="{ 'is-invalid': form.errors.has('name') }">
                                            <has-error :form="form" field="name"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                                            <div class="col-sm-12">
                                                <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email"  :class="{ 'is-invalid': form.errors.has('email') }">
                                                <has-error :form="form" field="email"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <button type="submit" class="btn btn-success">Update Profile</button>
                                                <div class="float-right d-sm-inline text-muted">Member since: <span>{{form.created_at|myDate}}</span></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                        </div><!-- /.card-body -->
                    </div>
                    <!-- /.nav-tabs-custom -->
            </div>
            <!-- end tabs -->
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return {
                 form: new Form({
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                    created_at: ''
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods:{

            updateInfo(){
                this.$Progress.start();
                if(this.form.password == ''){
                    this.form.password = undefined;
                }
                this.form.put('api/profile')
                .then((data)=>{
                    this.$Progress.finish();
                    Toast.fire({
                        icon: 'success',
                        title: data.data.message
                    });
                })
                .catch((data) => {
                    this.$Progress.fail();

                    Toast.fire({
                        icon: 'error',
                        title: 'Some error occured! Please try again'
                    });
                });
            },

            updatePassword(){
                this.$Progress.start();
                this.form.post('api/change-password')
                .then((data)=>{
                    //  Fire.$emit('AfterCreate');
                    this.$Progress.finish();
                    this.form.current_password = '';
                    this.form.new_password = '';
                    this.form.confirm_password = '';

                    Toast.fire({
                        icon: 'success',
                        title: data.data.message
                    });
                })
                .catch(() => {
                    this.$Progress.fail();

                    Toast.fire({
                        icon: 'error',
                        title: 'Some error occured! Please try again'
                    });
                });
            }
        },

        created() {

            this.$Progress.start();

            axios.get("api/profile")
            .then(({ data }) => (this.form.fill(data.data)));

            this.$Progress.finish();
        }
    }
</script>
