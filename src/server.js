const express = require("express");
//const supabase = require("@supabase/supabase-js");
const app = express();
const {createClient} = require("@supabase/supabase-js");
const cors = require("cors")

const supabase = createClient('https://qxrravdeiskdefqwmiwh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cnJhdmRlaXNrZGVmcXdtaXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyNDI1MjQsImV4cCI6MTk5MjgxODUyNH0.KLXwPQNclkBAFrrQUHhlYsz5E9V86QTukIgZruAvksk')

app.use(cors())
//нда
app.use(express.json());


const getUser = async (id, insert) => {
    try {
        const {data, error, count} = await supabase
            .from("Users")
            .select("*", {count: "exact"})
            .eq("id", id);

        if (error) {
            let error = new Error("Что-то не так")
            error.statusCode = 400
            throw error
        }
        return true
        insert()
    } catch (e) {
        throw (e)
    }
}

const insertTeam = async (name, ownerId) => {
    try {
        const {error} = await supabase
            .from("Teams")
            .insert({name: name, owner_id: ownerId})
        return error
    } catch (e) {

    }
}
const insertProject = async (name, teamId) => {
    try {
        const {error} = await supabase
            .from("Projects")
            .insert({name: name, team_id: teamId})
        return error
    } catch (e) {

    }
}

const getProjects = async () => {
    try {
        const {data, error} = await supabase
            .from('Projects')
            .select()
        return data
    } catch (e) {
        throw (e)
    }
}

const getTeams = async () => {
    try {
        const {data, error} = await supabase
            .from('Teams')
            .select()
        return data
    } catch (e) {
        throw (e)
    }
}

const getUsers = async () => {
    try {
        const {data, error} = await supabase
            .from('Users')
            .select()
        return data
    } catch (e) {
        throw (e)
    }
}

const newUser = async (username, role_id, password) => {
    console.log({username, role_id, password})
    try {
        const {error} = await supabase
            .from('Users')
            .insert({username: username, role_id: role_id, password: password})
        return error
    } catch (e) {
        throw (e)
    }
}



const deleteUser = async (id) => {
    try {
        const {error} = await supabase
            .from('Users')
            .delete()
            .eq('id', id)

        if(error) {
            console.log("Whoops")
        }
    } catch (e) {
        throw (e)
    }
}

const deleteTeam = async (id) => {
    try {
        const {error} = await supabase
            .from('Teams')
            .delete()
            .eq('id', id)

        if(error) {
            console.log("Whoops")
        }
    } catch (e) {
        throw (e)
    }
}

const deleteProject = async (id) => {
    try {
        const {error} = await supabase
            .from('Projects')
            .delete()
            .eq('id', id)

        if(error) {
            console.log("Whoops")
        }
    } catch (e) {
        throw (e)
    }
}

app.get("/projects", (req, res, next) => {
    getProjects()
        .then(result => {
            res.status(200).json({
                projectsData: result
            })
        })
});

app.post("/projects/delete", (req, res, next) => {
    const {id} = req.body
    deleteProject(id)
        .then(result => {
            res.status(200).json({
                rolesData: result
            })
        })
});

app.post("/users", (req, res, next) => {
    console.log(req.body)
    const {username, role_id, password} = req.body.props
    newUser(username, role_id, password)
        .then(result => {
            res.status(200).json({
                usersData: result
            })
        })
})
app.get("/users", (req, res, next) => {
    getUsers()
        .then(result => {
            res.status(200).json({
                usersData: result
            })
        })
})

app.post("/users/delete", (req, res) => {
    console.log(req.body)
    const {id} = req.body
    deleteUser(id)
        .then(result => {
            res.json(result)
        })
        //TODO: обработка ошибок
})

app.get("/teams", (req, res, next) => {
    getTeams()
        .then(result => {
            res.status(200).json({
                teamsData: result
            })
        })
})

    app.post("/teams/delete", (req, res, next) => {
    const {id} = req.body
    deleteTeam(id)
        .then(result => {
            res.json(result)
        })
})

app.post("/teams/add", (req, res) => {
    const {id, name} = req.body
    insertTeam(name, id).then(result => {
        res.send(result)
    }).catch(error => {
        res.status(400).json(error)
    })
})
app.post("/projects/add", (req, res) => {
    const {id, name} = req.body
    insertProject(name, id).then(result => {
        res.send(result)
    }).catch(error => {
        res.status(400).json(error)
    })
})



app.listen(3000, () => {
    console.log("start")
});