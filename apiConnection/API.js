const url = "http://localhost:4002/usuariosRegistrados"

export const getUsers = async()=>{
    try {
        const result = await fetch(url)
        const usersData = await result.json()
        
        // console.log(typeof usersData);        
        return usersData
    } catch (error) {
        console.log("error");
    }   

}

export const newUser = async(persona) => {
    try {
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(persona),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        window.location.href='login.html';        
    } catch (error) {
        console.log(error);
    }
}