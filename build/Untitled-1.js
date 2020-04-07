function a(){    
    console.log(this)
}

var b={ name:1 }
a.apply(b)
