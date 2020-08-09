const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: 'Gabriel Arimatéa',
        avatar: 'https://avatars0.githubusercontent.com/u/29737104?s=460&u=531d65b05d05903462bff9c82ecae5db2094ae94&v=4',
        whatsapp:'7855489325',
        bio: 'Não sabendo o que está fazendo aqui'
    }

    classValue = {
        subject: 'Português',
        cost: '15',
        // O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // O class_id virá pelo banco de dados
        {
            weekday: 1,
            time_from: 720, // Horario escrito em minutos
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    await createProffy(db, { proffyValue, classValue, classScheduleValues })

    // Consultar os dados

    // Todos os proffys
    
})