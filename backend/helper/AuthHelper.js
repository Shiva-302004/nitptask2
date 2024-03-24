const bcryptjs=require("bcryptjs")

const hashpass=async(val)=>{
    const pass=await bcryptjs.hash(val,10)
    return pass
}
const passcheck=async(newval,oldval)=>{
    const isCompare=bcryptjs.compare(newval,oldval)
    return isCompare
}
module.exports={hashpass,passcheck}