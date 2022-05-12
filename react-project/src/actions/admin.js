/*
Get register and VIP user info from database
*/
export function getStats (adminComp) {
    getRegistered(adminComp);
    getVipAmount(adminComp)
}

//Get the total number of registered users
const getRegistered = (adminComp) => {
    const url = '/admin/registered'

    fetch(url, {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then ((json) => {
            adminComp.setState({ numRegistered: json.numRegistered})
        })
        .catch(error => {
            console.log(JSON.stringify(error))
        })
}

//Get the proportion of VIP users out of all non-admin users
const getVipAmount = (adminComp) => {
    const url = '/admin/vips'

    fetch(url, {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status === 200) {
               return res.json()
            }
        })
        .then ((json) => {
            let data = adminComp.state.data;
            data[0].value = json.vip; // 6.7
            data[1].value = json.total - json.vip;
            adminComp.setState({data: data})
        })
        .catch(error => {
            console.log(JSON.stringify(error))
        })
}

/*
Delete user from database
*/
export const deleteUser = (adminComp) => {
    const url = '/admin/' + adminComp.state.userToBeDeleted

    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then((res) => {
            switch (res.status){
            case 200: 
                alert("Deletion complete")
                break;
            case 404:
                alert("User not found")
                break;
            default:
                alert("Unknown error, please contact backend Dev")
                break;
            }
        })
        .catch((error) => {
            console.log(error)
        })
};