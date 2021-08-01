<template>
<div>
    <div class="flex items-center mb-1">
        <div class="bg-gray-500 rounded-full h-3 w-3 md:h-8 md:w-8"></div>
        <div class="flex-1 ml-2 font-mono md:font-medium text-xs md:text-base lg:text-lg text-blue-600">
        <sup>{{new Date().toDateString().split(' ')[0]}}</sup>
        {{new Date().toDateString().split(' ')[2]}},
        {{new Date().toDateString().split(' ')[1]}}
        {{new Date().toDateString().split(' ')[3]}}
        {{new Date().toDateString().split(' ')[4]}} - Track your todos today
        </div>
    </div>
    <div class="ml-8 md:ml-16">
        v0.1.0 - v0.2.2
        <p class="text-gray-700 text-xs">
        Coz failing to plan is planning to fail.
        </p>
        <p class="text-gray-700 text-xs pb-4">
        Add and delete todos in the most fun interactive interface, curated by d* enterprises
        </p>
    </div>
    <div class="flex flex-wrap">
        <div class="lg:block ml-12 md:ml-16 opacity-25">
        <!-- dummy card placeholder -->
        <CardSkeleton/>
        </div>
        <div class="hidden md:block ml-4 md:ml-16 opacity-25">
        <!-- dummy card placeholder -->
        <CardSkeleton/>
        </div>
        <div class="hidden lg:block ml-4 md:ml-16 opacity-25">
        <!-- dummy card placeholder -->
        <CardSkeleton/>
        </div>
        <div class="hidden lg:block ml-4 md:ml-16 opacity-25">
        <!-- dummy card placeholder -->
        <CardSkeleton/>
        </div>
    </div>
</div>
</template>
<script>
import CardSkeleton from '@/components/CardSkeleton.vue'
export default{
  components: {
    CardSkeleton
  },
}
</script>