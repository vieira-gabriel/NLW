module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
    // Inserir dados a tabela de teachers
    // O await tira a necessidade do .then, ja que ele espera uma resposta pra seguir pra próxima linha
    // Para usar o await, a função principal deve ser async
    // Ele armazena na constante o id do professor
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
           name,
           avatar,
           whatsapp,
           bio 
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // Inserir dados na tabela classes
    const insertedClasses = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClasses.lastID

    //Inserir dados na tabela class_schedule
    const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => {  // map se comporta parecido como o forEach. O argumento da função é cada elemento do vetor pegado pelo map
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // Executando todos os db.run()'s das class_schedules
    await Promise.all(insertedAllClassesScheduleValues)
}