<template>
    <div id="appAlumno">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">CHAT USUARIOS</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <ul id="ltsMensajes">
                                    <li v-for="msg in chats" :key="msg._id">
                                        {{ msg.from }}: {{ msg.message }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-10">
                                <form id="frmChat" v-on:submit.prevent="guardarChat">
                                    <input type="text" v-model="chat.message"
                                        required placeholder="Escribe aqui tu mensaje." class="form-control"/>
                                    <input type="submit" value="Enviar"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import alertifyjs from 'alertifyjs';
import axios from 'axios';

    export default{
        props:['form'],
        data(){
            return {
                chats:[],
                chat:{
                    from:'pedro',
                    to:'todos',
                    message:'',
                    status:'',//en espera, enviado, recibido, leido
                    fecha:new Date()
                }
            }
        },
        methods:{
            guardarChat(){
                if( this.chat.message!='' ){
                    this.chats.push({...this.chat});
                    socketio.emit('chat', this.chat);
                }else{
                    alertifyjs.error('Por favor escriba un mensaje');
                }
            },
            obtenerHistorial(){
                socketio.emit('historial');
                socketio.on('historial', chats=>{
                    this.chats = chats;
                });
            }
        },
        created(){
            this.obtenerHistorial();
            socketio.on('chat', chat=>{
                this.chats.push(chat);
            });
        }
    }
</script>