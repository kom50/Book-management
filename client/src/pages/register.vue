<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-2 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" /> -->
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account
            </h2>
        </div>

        <div
            class="mt-10 sm:mx-auto sm:w-full sm:max-w-md shadow-sm border-[0.6px] border-gray-50 sm:px-10 p-6 sm:py-12 bg-white rounded-lg">
            <form class="space-y-6" action="#">
                <div>
                    <div class="flex items-center justify-between">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                    </div>
                    <div class="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" required="true"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <!-- <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div> -->
                    </div>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password" required="true"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="re-password" class="block text-sm font-medium leading-6 text-gray-900">Again
                            Password</label>
                        <!-- <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div> -->
                    </div>
                    <div class="mt-2">
                        <input id="re-password" name="re-password" type="password" autocomplete="current-password"
                            required="true"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Create Account</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                If you have account
                {{ ' ' }}
                <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    LOGIN</router-link>
            </p>
        </div>
    </div>
</template>