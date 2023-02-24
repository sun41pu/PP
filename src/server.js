const express = require("express");
//const supabase = require("@supabase/supabase-js");
const app = express();
const {createClient} = require("@supabase/supabase-js");

const supabase = createClient('https://qxrravdeiskdefqwmiwh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cnJhdmRlaXNrZGVmcXdtaXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyNDI1MjQsImV4cCI6MTk5MjgxODUyNH0.KLXwPQNclkBAFrrQUHhlYsz5E9V86QTukIgZruAvksk')


const getRoles = async () => {
    try {
        const {data, error} = await supabase
            .from('Roles')
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

app.get("/roles", (req, res, next) => {
    getRoles()
        .then(result => {
            res.status(200).json({
                rolesData: result
            })
        })
});

app.get("/users", (req, res, next) => {
     getUsers()
        .then(result => {
            res.status(200).json({
                usersData: result
            })
        })
})

app.get("/teams", (req, res, next) => {
    getTeams()
        .then(result => {
            res.status(200).json({
                teamsData: result
            })
        })
})

app.listen(3000, () => {
    console.log("start")
});