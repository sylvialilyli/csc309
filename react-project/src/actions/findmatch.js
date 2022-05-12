/*
Get match list from server
*/
export function getMatch(id, findMComp) {

    // Create our request constructor with all the parameters we need
    const request = new Request("/findmatch", {
        method: "post",
        body: JSON.stringify({
            _id: id
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    //Fetch user information from the database
    fetch(request)
        .then(res => {
            switch (res.status) {
                case 404:
                    alert("Your pet does not have a match")
                    return null;
                case 500:
                    alert("Unknown Error")
                    return null;
                default:
                    return res.json();

            }
        }).then(json => {

            if (json === null) {
                return; //Error Occured
            }

            findMComp.setState({
                matchList: json.matchedInfo
            })

            if (json.matchedInfo.length === 0){
                alert("Sorry we dont have any matches at the moment")
            } else {
                findMComp.setState({
                    matchList: json.matchedInfo
                })
                findMatch(findMComp)
            }
        })
        .catch(error => {
            console.log(error);
        });
}


/*
Display the next possible matches
*/
export function findMatch(findMComp) {

    if (findMComp.state.matchList.length === 0){
        alert("Sorry we dont have any matches at the moment")
    } else if (findMComp.state.currentMatch === findMComp.state.matchList.length){ //Check if all possible matches has been iterated
        findMComp.setState({ 
            currentMatch: 0,
            match: findMComp.state.matchList[0]
        })
    }  else { //Iterate to the next matches
        findMComp.setState({
            match: findMComp.state.matchList[findMComp.state.currentMatch],
            currentMatch: (findMComp.state.currentMatch + 1),
        })
    }

}