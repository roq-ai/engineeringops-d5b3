import * as yup from 'yup';

export const assetValidationSchema = yup.object().shape({
  type: yup.string().required(),
  project_id: yup.string().nullable(),
});
