import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createMetric } from 'apiSdk/metrics';
import { metricValidationSchema } from 'validationSchema/metrics';
import { ProjectInterface } from 'interfaces/project';
import { getProjects } from 'apiSdk/projects';
import { MetricInterface } from 'interfaces/metric';

function MetricCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MetricInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMetric(values);
      resetForm();
      router.push('/metrics');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MetricInterface>({
    initialValues: {
      type: '',
      value: 0,
      project_id: (router.query.project_id as string) ?? null,
    },
    validationSchema: metricValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Metrics',
              link: '/metrics',
            },
            {
              label: 'Create Metric',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Metric
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.type}
            label={'Type'}
            props={{
              name: 'type',
              placeholder: 'Type',
              value: formik.values?.type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Value"
            formControlProps={{
              id: 'value',
              isInvalid: !!formik.errors?.value,
            }}
            name="value"
            error={formik.errors?.value}
            value={formik.values?.value}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('value', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<ProjectInterface>
            formik={formik}
            name={'project_id'}
            label={'Select Project'}
            placeholder={'Select Project'}
            fetcher={getProjects}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/metrics')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'metric',
    operation: AccessOperationEnum.CREATE,
  }),
)(MetricCreatePage);
