import * as yup from 'yup';

export const metricValidationSchema = yup.object().shape({
  type: yup.string().required(),
  value: yup.number().integer().required(),
  project_id: yup.string().nullable(),
});
