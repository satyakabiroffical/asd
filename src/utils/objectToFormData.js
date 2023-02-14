export default (obj) => {
    const form = new FormData()
    
    for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
        if(typeof(value) == "object" && !value.uri ){
            alert("asd")
            form.append(key, JSON.stringify(value))
        }
        else{
            form.append(key, value)
        }
    }
    return form
}