
<template>



</template>


<script>
import XLSX from 'xlsx'

export default {
    data(){
        return{
          fileContent:''
        }
    },
    methods : {
        excel2html() {
            var vm = this;
            this.$axios.get('/getexcel',{  
                responseType: 'blob'
            })
            .then((response) => {
                console.log(response)
                var reader = new FileReader();  
                reader.onload = e => {  
                    //预处理  
                    var binary = '';  
                    var buf = new Uint8Array(e.target.result);  
                    var length = buf.byteLength;  
                    for (var i = 0; i < length; i++) {  
                    binary += String.fromCharCode(buf[i]);  
                    }  //读取excel  
                    const wb = XLSX.read(binary, {type: "binary"});  
                    console.log("wb",wb);  
                    //抓取第一个sheet
                    let wsname = wb.SheetNames[0];  
                    let ws = wb.Sheets[wsname];
                    
                    // 用来赋值 this.fileContent = XLSX.utils.sheet_to_html(ws);
                    this.fileContent = XLSX.utils.sheet_to_html(ws);
                };
                reader.readAsArrayBuffer(response.data);  
            }) 
            .catch(error => {  
                console.log(error);  
            });
        return this.fileContent;  
        },
    }

}

</script>


