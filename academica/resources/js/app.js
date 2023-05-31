import './bootstrap';
import { createApp } from 'vue';
import alertifyjs from 'alertifyjs';
window.socketio = io('http://127.0.0.1:3001');
window.db = "";

import alumno from './components/AlumnoComponent.vue';
import chat from './components/ChatComponent.vue';

socketio.on('connect', e=>{
    console.log('Conectado');
});

const app = createApp({
    components:{
        alumno,
        chat,
    },
    data(){
        return {
            forms:{
                docente     : {mostrar:false},
                alumno      : {mostrar:false},
                materia     : {mostrar:false},
                matricula   : {mostrar:false},
                inscripcion : {mostrar:false},
                chat        : {mostrar:false},
            }
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            //this.$refs[form].listar();
        },
        abrirBD(){
            let indexDB = indexedDB.open('db_sistema_academico',1);
            indexDB.onupgradeneeded=e=>{
                let req = e.target.result,
                    tbldocente = req.createObjectStore('tbldocentes', {keyPath:'idDocente'}),
                    tblalumno = req.createObjectStore('tblalumnos',{keyPath:'idAlumno'}),
                    tblmateria = req.createObjectStore('tblmaterias',{keyPath:'idMateria'});

                tbldocente.createIndex('idDocente', 'idDocente', {unique:true});
                tblalumno.createIndex('idAlumno', 'idAlumno', {unique:true});
                tblmateria.createIndex('idMateria', 'idMateria', {unique:true});
            };
            indexDB.onsuccess= e=>{
                db = e.target.result;
                alertifyjs.success('Sistema LISTO.');
            };
            indexDB.onerror= e=>{
                console.error( e );
                alertifyjs.error('Error: ' + e);
            };
        }, 
    },
    created() {
        this.abrirBD();
    }
});
app.mount("#app");