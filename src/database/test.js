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
        subject: 8,
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
    const selectProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectProffys)

    // Consultar as classes de um determinado professor e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)
    console.log(selectClassesSchedules)
})