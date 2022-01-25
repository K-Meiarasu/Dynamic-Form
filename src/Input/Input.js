import React from 'react'

function Input (_props)
{
    const [state, setState] = React.useState({
        username: "",
        email:"",
        password:""
      })
    
    var msg=''

    const inputList = [
        {
            type : "text", label : "Enter your Username : ", placeholder : "Username", datatestid : 'username'
        },
        {
            type : "email", label : "Enter your Email : ", placeholder : "Email", datatestid : 'email',
        },
        {
            type : "password", label : "Enter your Password : ", placeholder : "Password", datatestid : 'password'
        },
    ]
    function handleChange(field,event)
    {
        document.getElementById([field]+"-id").style.borderColor="grey"
        setState({[field]: event.target.value});
    }
    function validation(field,event)
    {
        if(event.target.value === "")
        {
            if(field === "username")
                msg="Fill this Username field"
            if(field === "email")
                msg="Fill this Email field"
            if(field === "password")
                msg="Please enter your password"
            document.getElementById([field]).innerHTML=msg
            document.getElementById([field]+"-id").style.borderColor="red"
        }

        else if(field === "email")
        {
            var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!event.target.value.match(email))
            {
                document.getElementById([field]).innerHTML="Invalid Email Address"
                document.getElementById([field]+"-id").style.borderColor="red"
            }
        }

        else if(field === "password")
        {
            let strength = []
            let a = state.password;
            for(let i=0;i<a.length;i++)
            {
                if('A' <= a[i] && a[i] <= 'Z')
                    strength[0]=1
                else if('a' <= a[i] && a[i] <= 'z')
                    strength[1]=1
                else if('0' <= a[i] && a[i] <= '9')
                    strength[2]=1
                else 
                {
                    strength[3]=1
                }
            }
            var passwordStrength=strength.reduce((prev, curr) => prev + curr, 0);
            var msg = ""
            var color =""
            if(passwordStrength === 1)
            {
                msg = "Password is Weak"
                color = "red"
            }
            else if(passwordStrength === 2)
            {
                msg = "Password is Good"
                color = "orange"
            }
            else if(passwordStrength === 3)
            {
                msg = "Password is Strong"
                color = "lightgreen"
            }
            else if(passwordStrength === 4)
            {
                msg = "Password is Very Strong"
                color = "green"
            }
            document.getElementById([field]).innerHTML=msg
            document.getElementById([field]).style.color=color
            document.getElementById([field]+"-id").style.borderColor=color
        }
    }

    function clear(field){
        document.getElementById([field]).innerHTML=""
    }

    return (
        <div className="card">
            <h1>Dynamic Form</h1><hr/>
            {
                inputList.map(form =>
                <div>
                    <label>{form.label}</label><br/>
                    <input onBlur={(e)=>validation(form.datatestid,e)} 
                            onFocus={(e)=>clear(form.datatestid,e)}
                            onChange={(e)=>handleChange(form.datatestid,e)} 
                            type={form.type} 
                            placeholder={form.placeholder} 
                            id={form.datatestid + "-id"} 
                            data-testid={form.datatestid}/>
                    <div className='msg' id={form.datatestid}></div>
                    <br/>
                </div>
                )
            }
        </div>
      );
}

export default Input