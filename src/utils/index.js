import statuses from "../statuses";


export const truncateUUID = (uuid) => {
    return `${uuid.substring(0, 7)}`
}

export const runPieTransformation = (run) => {
    return Object.keys(run.byStatus).map((k) => ({title: k, value: run.byStatus[k.toLowerCase()], color: statuses[k.toLowerCase()]['color']}))
}