import dayjs from 'dayjs';

export const formatDate = (date, schema) => dayjs(date).format(schema);


