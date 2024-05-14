<template>
  <section class="reservation-form">
    <div class="main-form">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input
          v-model.trim="name"
          v-bind="nameAttrs"
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': errors.name }]"
          id="name"
        />
        <p v-show="errors.name" class="error-text">{{ errors.name }}</p>
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">Phone</label>
        <input
          v-model.trim="phone"
          v-bind="phoneAttrs"
          type="text"
          class="form-control"
          :class="[{ 'is-invalid': errors.phone }]"
          id="phone"
        />
        <p v-show="errors.phone" class="error-text">{{ errors.phone }}</p>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          v-model.trim="email"
          v-bind="emailAttrs"
          class="form-control"
          :class="[{ 'is-invalid': errors.email }]"
          id="email"
        />
        <p v-show="errors.email" class="error-text">{{ errors.email }}</p>
      </div>
      <div class="people-select form-group">
        <label class="form-label">people</label>
        <div class="group-btn">
          <button class="btn btn-theme" :disabled="people === 1" @click="people--">
            <i class="fa fa-minus" />
          </button>
          <h5>{{ people }}</h5>
          <button class="btn btn-theme" :disabled="people === maxPeople" @click="people++">
            <i class="fa fa-plus" />
          </button>
        </div>
      </div>
    </div>
    <button
      class="btn submit-btn btn-theme"
      :disabled="!meta.dirty || !meta.valid || !isSelectDateRange"
      @click="onSubmit"
    >
      Confirm
    </button>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type { IUserInfo } from '@/types/orders';

withDefaults(
  defineProps<{
    maxPeople: number;
    isSelectDateRange: boolean;
  }>(),
  {
    maxPeople: 1,
    isSelectDateRange: false
  }
);

const emit = defineEmits<{
  submit: [form: IUserInfo];
}>();

//人數
const people = defineModel<number>('people', { default: 1 });

//防呆規則
const schema = yup.object({
  name: yup.string().trim().required('This field is required.'),
  phone: yup
    .string()
    .trim()
    .matches(/^09[0-9]{8}$/, 'Please enter a valid phone number.')
    .required('This field is required.'),
  email: yup
    .string()
    .trim()
    .required('This field is required.')
    .email('Please enter a valid email address.')
});

const { errors, meta, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema
});

const [name, nameAttrs] = defineField('name');
const [phone, phoneAttrs] = defineField('phone');
const [email, emailAttrs] = defineField('email');

const onSubmit = handleSubmit((values) => {
  emit('submit', {
    ...(values as IUserInfo)
  });
});
const onResetForm = () => {
  resetForm({
    values: {
      name: null,
      phone: null,
      email: null
    }
  });
};
</script>

<style scoped lang="scss">
.main-form {
  width: 100%;

  .form-group {
    position: relative;
    margin-bottom: 30px;

    label {
      margin: 0;
    }

    .form-control {
      border: none;
      border-bottom: 1px solid;
      border-radius: 0;
      padding: 0.375rem 0;
      background-color: transparent;

      &:focus {
        box-shadow: none;
      }

      &.is-invalid {
        border-color: var(--danger-color);
        color: var(--danger-color);
      }
    }

    .error-text {
      color: var(--danger-color);
    }
  }

  .people-select {
    .group-btn {
      margin: 10px 0;
      display: flex;
      align-items: center;
      gap: 15px;

      .btn-theme {
        padding: 0;
        width: 45px;
        height: 30px;
        border-radius: 30px;
      }

      h5 {
        margin: 0;
      }
    }
  }
}

.submit-btn {
  border-radius: 30px;
  width: 125px;
  height: 45px;
  box-shadow: 1px 1px 5px 0 var(--primary-color);
}
</style>
