var cmd = require('node-stdio');
 
function test() {
   var input = cmd.read_line();
    input = input.split("");
    var arr = [];
    var str = '';
    var o = 0;
    var a = input.length;
    function huisu(m){

        for(var i=m;i<a;i++){
            if(input[i].charCodeAt()<97){
                str += input[i].charCodeAt();
                huisu(i++)
            }else{
                arr[o] =str;
                str='';
                o++;
            }
    
        }
    }
    huisu(0);
    var k=arr.length;
    for(var p=0;p<k;p++){
        var t = arr[p];
        for(var u=0;u<k;u++){
            if(t>arr[u]){
                arr[p] = arr[u];
                arr[u] = t;
            }
        }
    }
    for(var r = 0; r<k;r++){
        cmd.printsth(arr[r]);
    }
}
test(He15l154lo87wor7l87d);