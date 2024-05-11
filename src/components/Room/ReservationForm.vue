<template>
  <section class="reservation-form">
    <div>
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
      <div class="form-check">
        <input
          v-model="isAgree"
          class="form-check-input"
          type="checkbox"
          value=""
          id="invalidCheck"
        />
        <label class="form-check-label" for="invalidCheck">
          Please confirm your reservation details are correct. If you have any questions or need
          assistance, please contact our hotel service team.
        </label>
      </div>
    </div>
    <button
      class="btn submit-btn"
      :disabled="!isAgree || !meta.dirty || !meta.valid"
      @click="onSubmit"
    >
      Confirm
    </button>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';

const isAgree = ref<boolean>(false);

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
  alert(JSON.stringify(values, null, 2));
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

.form-check {
  font-size: 14px;
  margin-bottom: 15px;

  .form-check-input {
    &:checked {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }

    &:focus {
      box-shadow: none;
      border-color: var(--primary-color);
    }
  }
}

@mixin primary-btn {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.submit-btn {
  border-radius: 30px;
  width: 125px;
  height: 45px;
  box-shadow: 1px 1px 5px 0 var(--primary-color);
  @include primary-btn;

  &:disabled {
    cursor: not-allowed;
    pointer-events: inherit;
  }

  &:hover,
  &:active {
    opacity: 0.8;
  }
}

:not(.btn-check) + .btn:active {
  @include primary-btn;
}
</style>
