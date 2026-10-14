@props([
    'defaultDate' => null,
    'minDate' => null,
    'maxDate' => null,
    'setNullInput' => false,
    'withTime' => false,
    'withTimeSeconds' => true,
    'ignoreWire' => true,
    'label'=> null,
    'showIcon' => true,
    'required'=> false,
    'showFormat' => null,
    'returnFormat' => null,
    'wirePropertyName' => null,
    'currentView' => 'day',
    'uniqueId' => 'dp-'. uniqid()
])
<div class="tw:w-full persian-datepicker" dir="rtl" {{ $ignoreWire ? 'wire:ignore' : '' }}>
    <div class="tw:relative"
         x-data="persianDatepicker('{{ $uniqueId  }}','{{ $defaultDate  }}','{{ $setNullInput  }}','{{ $withTime  }}','{{ $showFormat }}','{{ $returnFormat }}','{{ $currentView }}','{{ $minDate }}','{{ $maxDate }}')"
         x-init="[initDate(), getNoOfDays()]" id="{{$uniqueId}}"
         x-cloak>
        <div class="tw:relative pdp-input-area">
            <input type="text" name="datepickerDate" class="dp-return-input tw:hidden"
                   @input="$wire.set('{{$wirePropertyName}}', (!$event.target.value ? null : $event.target.value) )">
            @if($label)
                <label class="tw:block tw:font-medium tw:text-sm tw:text-gray-700">
                    {!! $label !!} {!! $required ? '<span class="tw:text-red-600 tw:text-xl tw:relative tw:top-1.5 tw:leading-none">*</span>' : ''!!}
                </label>
            @endif
            <div class="tw:relative tw:flex tw:items-center tw:mt-1">
                <input @click="showDatepicker = !showDatepicker"
                       class="auto-go-to-next pdp-input tw:outline-none tw:ring tw:ring-gray-300 tw:focus:ring-gray-500 tw:rounded-md tw:shadow-sm tw:block tw:w-full @if($showIcon) tw:pe-14 tw:ps-2 @else tw:px-2 @endif tw:text-sm tw:h-8 tw:transition-all tw:transition-200"
                       type="text" readonly
                       x-model="datepickerValue"
                       @keydown.escape="showDatepicker = false"
                       placeholder="{{ strip_tags($label) }}" {{ $attributes }}>

                @if($showIcon)
                    <div class="tw:absolute tw:left-0 tw:pl-3" @click="showDatepicker = !showDatepicker">
                        <svg class="tw:h-6 tw:w-6 tw:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                @endif
                <span x-show="datepickerValue"
                      class="material-icons tw:cursor-pointer tw:absolute @if($showIcon) tw:left-9 @else tw:left-2 @endif remove_date"
                      @click="removeDate(); showDatepicker = false">
                        <svg class="tw:w-6 tw:h-6" viewBox="0 0 24 24"><path
                                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                                fill="#ef4444"></path>
                        </svg>
                </span>
            </div>
        </div>
        <div
            class="tw:bg-white tw:z-40 tw:rounded-lg tw:shadow tw:p-4 tw:absolute tw:left-0"
            style="width: 17rem"
            x-show.transition="showDatepicker"
            @click.away="showDatepicker = false">

            <div class="tw:flex tw:justify-between tw:items-center tw:mb-2">
                <div>
                    <span x-text="monthNames[month - 1]" @click="currentView = 'month'" class="tw:text-lg tw:font-bold tw:text-gray-800 tw:cursor-pointer"></span>
                    <span x-text="year" @click="currentView = 'year'" class="tw:ml-1 tw:text-lg tw:text-gray-600 tw:font-normal tw:cursor-pointer"></span>
                </div>
                <div>
                    <button
                        type="button"
                        class="tw:transition tw:ease-in-out tw:duration-100 tw:inline-flex tw:cursor-pointer hover:tw:bg-gray-200 tw:p-1 tw:rounded-full"
                        @click="month--; getNoOfDays()">
                        <svg class="tw:h-6 tw:w-6 tw:text-gray-500 tw:inline-flex" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                    <button
                        type="button"
                        class="tw:transition tw:ease-in-out tw:duration-100 tw:inline-flex tw:cursor-pointer hover:tw:bg-gray-200 tw:p-1 tw:rounded-full"
                        @click="month++; getNoOfDays()">
                        <svg class="tw:h-6 tw:w-6 tw:text-gray-500 tw:inline-flex" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="tw:flex tw:flex-col" x-show="currentView == 'day'" x-transition>
                <div class="tw:flex tw:flex-wrap tw:mb-3 -tw:mx-1">
                    <template x-for="(day, index) in days" :key="index">
                        <div style="width: 14.26%" class="tw:px-1">
                            <div
                                x-text="day"
                                class="tw:text-gray-800 tw:font-medium tw:text-center tw:text-xs"></div>
                        </div>
                    </template>
                </div>

                <div class="tw:flex tw:flex-wrap -tw:mx-1">
                    <template x-for="blankDay in blankDays">
                        <div
                            style="width: 14.28%"
                            class="tw:text-center tw:border tw:p-1 tw:border-transparent tw:text-sm"
                        ></div>
                    </template>
                    <template x-for="(date, dateIndex) in no_of_days" :key="dateIndex">
                        <div style="width: 14.28%" class="tw:px-1 tw:mb-1">
                            <div
                                @click="if(date.isActive) { selectDay(date.day); isSelectedDay(date.day,$event.target)}"
                                x-text="date.day"
                                class="tw:cursor-pointer tw:w-6 tw:h-6 tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:text-center tw:text-sm tw:rounded-full tw:leading-loose tw:transition tw:ease-in-out tw:duration-100"
                                :class="{'todayItem tw:bg-blue-500 tw:text-white': isToday(date.day) == true, 'tw:text-gray-700 hover:tw:bg-blue-200': isToday(date.day) == false, 'datepickerItemSelected tw:bg-emerald-700 tw:text-white': isSelectedDay(date.day) == true}"
                                x-bind:style="date.isActive === false && { color: '#ccc' }"
                            ></div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="tw:flex tw:flex-col" x-show="currentView == 'month'" x-transition>
                <div class="tw:flex tw:flex-wrap tw:justify-between tw:gap-2 tw:p-2">
                    <template x-for="(monthItem, monthIndex) in monthRanges" :key="monthIndex">
                        <div
                            @click="monthItem.isActive ? selectMonth(monthItem.month) : null"
                            x-text="monthItem.name"
                            class="tw:cursor-pointer tw:flex tw:flex-wrap tw:w-16 tw:items-center tw:justify-center tw:text-center tw:text-sm tw:leading-loose tw:transition tw:ease-in-out tw:duration-100"
                            :class="{'monthItem tw:bg-blue-500 tw:text-white': isThisMonth(monthItem.month) == true, 'tw:text-gray-700 hover:tw:bg-blue-200': isThisMonth(monthItem.month) == false}"
                            x-bind:style="monthItem.isActive === false && { color: '#ccc' }"
                        ></div>
                    </template>
                </div>
            </div>
            <div class="tw:flex tw:flex-col" x-show="currentView == 'year'" x-transition>
                <div class="tw:flex tw:flex-wrap tw:justify-between tw:gap-2 tw:p-2 tw:h-44 tw:overflow-y-auto">
                    <template x-for="(yearItem, yearIndex) in yearRanges" :key="yearIndex">
                        <div
                            @click="yearItem.isActive ? selectYear(yearItem.year) : null"
                            x-text="yearItem.year"
                            class="tw:cursor-pointer tw:flex tw:flex-wrap tw:w-16 tw:items-center tw:justify-center tw:text-center tw:text-sm tw:leading-loose tw:transition tw:ease-in-out tw:duration-100"
                            :class="{'yearItem tw:bg-blue-500 tw:text-white': isThisYear(yearItem.year) == true, 'tw:text-gray-700 hover:tw:bg-blue-200': isThisYear(yearItem.year) == false}"
                            x-bind:style="yearItem.isActive === false && { color: '#ccc' }"
                        ></div>
                    </template>
                </div>
            </div>

            <div class="tw:flex tw:mt-1">
                <button type="button" @click="goToToday()"
                        class="tw:inline-flex tw:items-center tw:w-full tw:justify-center tw:px-4 tw:py-2 !tw:bg-sky-500 tw:text-white tw:shadow-md tw:border tw:border-transparent tw:rounded-lg tw:text-xs tw:focus:outline-none disabled:tw:opacity-25 tw:transition">
                    امروز
                </button>
            </div>
        </div>
        <div class="tw:relative pdp-time-area tw:mt-2 tw:flex tw:flex-row-reverse tw:items-center tw:gap-1" x-show="datepickerValue && withTime"
             x-transition>
            <div class="tw:w-full tw:relative">
                <input type="number" min="0" max="23" maxlength="2" x-model="hour"
                       @input="setTime('hour',$event.target)"
                       class="number_format tw:block tw:w-full tw:text-center tw:border-gray-300 tw:focus:border-gray-400 tw:focus:ring tw:focus:ring-gray-200 tw:focus:ring-opacity-50 tw:rounded-md tw:shadow-sm tw:h-11"/>
                <span class="tw:absolute tw:top-0.5 tw:right-1 tw:text-xxs tw:text-gray-400">ساعت</span>
            </div>
            <span>:</span>
            <div class="tw:w-full tw:relative">
                <input type="number" min="0" max="59" maxlength="2" x-model="minute"
                       @input="setTime('minute',$event.target)"
                       class="number_format tw:block tw:w-full tw:text-center tw:border-gray-300 tw:focus:border-gray-400 tw:focus:ring tw:focus:ring-gray-200 tw:focus:ring-opacity-50 tw:rounded-md tw:shadow-sm tw:h-11"/>
                <span class="tw:absolute tw:top-0.5 tw:right-1 tw:text-xxs tw:text-gray-400">دقیقه</span>
            </div>
            @if($withTimeSeconds)
                <span>:</span>
                <div class="tw:w-full tw:relative">
                    <input type="number" min="0" max="59" maxlength="2" x-model="second"
                           @input="setTime('second',$event.target)"
                           class="number_format tw:block tw:w-full tw:text-center tw:border-gray-300 tw:focus:border-gray-400 tw:focus:ring tw:focus:ring-gray-200 tw:focus:ring-opacity-50 tw:rounded-md tw:shadow-sm tw:h-11"/>
                    <span class="tw:absolute tw:top-0.5 tw:right-1 tw:text-xxs tw:text-gray-400">ثانیه</span>
                </div>
            @endif
        </div>

    </div>
</div>
