
"use strict"

/**
* timeCall.js is a simple library that help to get a human readable form of date object.
* @function timeCall
* @param { Date Object } Date Object
* @returns container Elements
* @inner
*/
class timeCall{
    constructor(date = String()) {
        this.date = date
        if(!this.date || this.date == '' || this.date == null || this.date == undefined) return console.error("Date is not defined")

        //check if date is valid
        var d = new Date(this.date);
        if(!isNaN(d.getTime())) {
            //do nothing
            this.date = d
        } else {
            return console.error("Date is not valid")
        }
    }

    
    /**
    * use this method to get how long date is.
    * @function ago
    * @returns time in  string or json
    * @inner
    */
    ago({withtime = new Boolean(), timeformat = new String(), json = new Boolean()} = {}) {

        try {
            withtime = typeof(withtime) == 'boolean' ? withtime : true
            json = typeof(json) == 'boolean' ? json : false
    
            const time_format = [
                "hh:mm:ss", "hh:mm", "hh",
            ]
            timeformat = time_format.indexOf(timeformat.toLowerCase()) != -1 ? timeformat : "hh:mm:ss"
    
    
            var time_value
            const init_time = function(){
                if(withtime){
                    if(timeformat == "hh:mm:ss"){
                        time_value = json != true ? `${Math.abs(hours)} hours ${Math.abs(minutes)} minutes ${Math.abs(seconds)} seconds` : {
                            hours: Math.abs(hours),
                            minutes: Math.abs(minutes),
                            seconds: Math.abs(seconds)
                        }
                        return time_value
                    }
                    else if(timeformat == "hh:mm"){
                        time_value = json != true ? `${Math.abs(hours)} hours ${Math.abs(minutes)} minutes` : {
                            hours: Math.abs(hours),
                            minutes: Math.abs(minutes)
                        }
                        return time_value
                    }
                    else if(timeformat == "hh"){
                        time_value = json != true ? `${Math.abs(hours)} hours` : {
                            hours: Math.abs(hours)
                        }
                        return time_value
                    }
                    else{
                        return ''
                    }
                }
                else{
                    return ''
                }
            }
    
    
            var date = new Date(this.date);
            var date_now = Date.now();
            // console.log(date_now, "date_now")
        
            //get the difference between the two dates and return it
            var diff = date_now - date;
            // console.log(diff, "diff")
        
            //convert the difference into days
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            // console.log(days, "days")
        
            //convert the difference into hours
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // console.log(hours, "hours")
        
            //convert the difference into minutes
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            // console.log(minutes, "minutes")
        
            //convert the difference into seconds
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            // console.log(seconds, "seconds")
        
            //convert the difference into milliseconds
            var milliseconds = Math.floor(diff % 1000);
            // console.log(milliseconds, "milliseconds")
    
            //if current date is greater than custom date then set time to 00
            if(date_now <= date){
                days = 0
                hours = 0
                minutes = 0
                seconds = 0
                milliseconds = 0
            }
    
    
            function getDate(){

                //return since just now if the difference is less than a minute
                if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
                    return {
                        since: "date",
                        date: "reached"
                    }
                }

                //return since just now if the difference is less than a minute
                if (days == 0 && hours == 0 && minutes == 0) {
                    return {
                        since: '',
                        date: "Just now"
                    }
                }
            
                //return since minutes if the difference is less than an hour
                if (days == 0 && hours == 0) {
                    return {
                        since: 'minutes',
                        date: Math.abs(minutes)
                    }
                }
            
                //return since hours if the difference is less than a day
                if (days == 0) {
                    return {
                        since: 'hours',
                        date: Math.abs(hours)
                    }
                }
            
                //return since days if the difference is less than a week
                if (days < 7) {
                      return {
                        since: 'days',
                        date: Math.abs(days)
                    }
                }
            
                //return since weeks if the difference is less than a month
                if (days < 30) {
                    return {
                        since: 'weeks',
                        date: Math.floor(Math.abs(days) / 7)
                    }
                }
    
                //return since months if the difference is less than a year
                if (days < 365) {
                    return {
                        since: 'months',
                        date: Math.floor(Math.abs(days) / 30)
                    }
                }
    
                //return since years if the difference is more than a year
                if (days > 365) {
                    return {
                        since: 'years',
                        date: Math.floor(Math.abs(days) / 365)
                    }
                }
            }
    
            var return_object = {}
            var time_obj = getDate()
            if(withtime && !json) return `${time_obj.date} ${time_obj.since} ${init_time()} ago`;
            else if(!withtime && !json) return `${time_obj.date} ${time_obj.since} ago`;
            else if(json && withtime){
                return_object[time_obj.since] = time_obj.date
                return {
                    success: true,
                    action: "ago",
                    data: {
                        ...return_object,
                        ...init_time()
                    }
                }
            }
            else if(json && !withtime){
                return_object[time_obj.since] = time_obj.date
                return {
                    success: true,
                    data: {
                        ...return_object
                    }
                }
            }
        } catch (error) {
            return {
                success: false,
                msg: "Something went wrong!",
                error
            }
        }
    }

    /**
     * use this method to get how long is left to date. 
     * @function left
     * @returns time in string or json
     * @inner
     */

    left({withtime = new Boolean(), timeformat = new String(), json = new Boolean()} = {}) {

        try {
            withtime = typeof(withtime) == 'boolean' ? withtime : true
            json = typeof(json) == 'boolean' ? json : false

            const time_format = [
                "hh:mm:ss", "hh:mm", "hh",
            ]
            timeformat = time_format.indexOf(timeformat) != -1 ? timeformat : "hh:mm:ss"


            var time_value
            const init_time = function(){
                if(withtime){
                    if(timeformat == "hh:mm:ss"){
                        time_value = json != true ? `${Math.abs(hours)} hours ${Math.abs(minutes)} minutes ${Math.abs(seconds)} seconds` : {
                            hours: Math.abs(hours),
                            minutes: Math.abs(minutes),
                            seconds: Math.abs(seconds)
                        }
                        return time_value
                    }
                    else if(timeformat == "hh:mm"){
                        time_value = json != true ? `${Math.abs(hours)} hours ${Math.abs(minutes)} minutes` : {
                            hours: Math.abs(hours),
                            minutes: Math.abs(minutes)
                        }
                        return time_value
                    }
                    else if(timeformat == "hh"){
                        time_value = json != true ? `${Math.abs(hours)} hours` : {
                            hours: Math.abs(hours)
                        }
                        return time_value
                    }
                    else{
                        return ''
                    }
                }
                else{
                    return ''
                }
            }

            var date = new Date(this.date);
            var date_now = Date.now();
            // console.log(date_now, "date_now")
        
            //get the difference between the two dates and return it
            var diff = date - date_now;
            // console.log(diff, "diff")
        
            //convert the difference into days
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
            //convert the difference into hours
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // console.log(hours, "hours")
        
            //convert the difference into minutes
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            // console.log(minutes, "minutes")
        
            //convert the difference into seconds
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            // console.log(seconds, "seconds")
        
            //convert the difference into milliseconds
            var milliseconds = Math.floor(diff % 1000);
            // console.log(milliseconds, "milliseconds")

            //if current date is greater than custom date then set time to 00
            if(date_now >= date){
                days = 0
                hours = 0
                minutes = 0
                seconds = 0
                milliseconds = 0
            }


            function getDate(){

                if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
                    return {
                        since: 'date',
                        date: "reached"
                    }
                }

                //return since just now if the difference is less than a minute
                if (days == 0 && hours == 0 && minutes == 0) {
                    return {
                        since: 'seconds',
                        date: Math.abs(seconds)
                    }
                }
            
                //return since minutes if the difference is less than an hour
                if (days == 0 && hours == 0) {
                    return {
                        since: 'minutes',
                        date: Math.abs(minutes)
                    }
                }
            
                //return since hours if the difference is less than a day
                if (days == 0) {
                    return {
                        since: 'hours',
                        date: Math.abs(hours)
                    }
                }
            
                //return since days if the difference is less than a week
                if (days < 7) {
                    return {
                        since: 'days',
                        date: Math.abs(days)
                    }
                }
            
                //return since weeks if the difference is less than a month
                if (days < 30) {
                    return {
                        since: 'weeks',
                        date: Math.floor(Math.abs(days) / 7)
                    }
                }

                //return since months if the difference is less than a year
                if (days < 365) {
                    return {
                        since: 'months',
                        date: Math.floor(Math.abs(days) / 30)
                    }
                }

                //return since years if the difference is more than a year
                if (days > 365) {
                    return {
                        since: 'years',
                        date: Math.floor(Math.abs(days) / 365)
                    }
                }
            }

            var return_object = {}
            var time_obj = getDate()
            if(withtime && !json) return `${time_obj.date} ${time_obj.since} ${init_time()} left`;
            else if(!withtime && !json) return `${time_obj.date} ${time_obj.since} left`;
            else if(json && withtime){
                return_object[time_obj.since] = time_obj.date
                return {
                    success: true,
                    action: "left",
                    data: {
                        ...return_object,
                        ...init_time()
                    }
                }
            }
            else if(json && !withtime){
                return_object[time_obj.since] = time_obj.date
                return {
                    success: true,
                    data: {
                        ...return_object
                    }
                }
            }
        } catch (error) {
            return {
                success: false,
                msg: "Something went wrong!",
                error
            }
        }       

    }

    /**
     * use this method to modified date. 
     * @function format
     * @returns time in string or json
     * @inner
     */
    format(format = new String(), {datedivider = new String(), timedivider = new String()}={}){

            format = typeof(format) == 'string' ? format : "DD MMMM YYYY hh mm a"

            datedivider = typeof(datedivider) == 'string' ? datedivider : "-";
            timedivider = typeof(timedivider) == 'string' ? timedivider : ":";

            const date_time_formats = [
                "EEEE", "MM", "MMM", "MMMM", "dd", "DD", "yy", "yyyy", "HH", "hh", "h", "mm", 'm', "ss", "a", "YYYY", "d", "M"
            ]

            //separet the format into array
            var format_array = format.split(" ")

            //check if the format is invalid
            for(var i = 0; i < format_array.length; i++){
                if(date_time_formats.indexOf(format_array[i]) == -1){
                    return console.error(`Invalid format: ${format_array[i]}`)
                }
            }

            var return_date = ''

            //filter all date patterns in format array
            var time_patterns = ["HH", "hh", "h", "mm", 'm', "ss", "a"]
            var date_patterns = ["EEEE", "MM", "MMM", "MMMM", "dd", "DD", "yy", "yyyy", "YYYY", "d", "M"]

            //return any pattern that match pattern in date_patterns
            var date_patterns_available = []
            for(var i = 0; i < format_array.length; i++){
                var pattern = format_array[i]
                if(date_patterns.indexOf(pattern) != -1){
                    date_patterns_available.push({
                        pattern: pattern,
                        index: format_array.indexOf(pattern)
                    })
                }
            }

            //return any pattern that match pattern in time_patterns
            var time_patterns_available = []
            for(var i = 0; i < format_array.length; i++){
                var pattern = format_array[i]
                if(time_patterns.indexOf(pattern) != -1){
                    time_patterns_available.push({
                        pattern: pattern,
                        index: format_array.indexOf(pattern)
                    })
                }
            }


            //loop through the format array
            for(var i = 0; i < format_array.length; i++){
                //if format is MM
                if(format_array[i] == "MM"){
                    return_date += this.date.getMonth() + 1
                }
                //if format is MMM
                else if(format_array[i] == "MMM"){
                    return_date += this.date.toLocaleString('en-us', { month: 'short' })
                }
                //if format is MMMM
                else if(format_array[i] == "MMMM"){
                    return_date += this.date.toLocaleString('en-us', { month: 'long' })
                }
                //if format is EEEE
                else if(format_array[i] == "EEEE"){
                    return_date += this.date.toLocaleString('en-us', { weekday: 'long' }) + ", "
                }
                //if format is dd
                else if(format_array[i] == "dd"){
                    return_date += this.date.getDate()
                }
                //if format is yy
                else if(format_array[i] == "yy"){
                    return_date += this.date.getFullYear().toString().substr(2, 2)
                }
                //if format is yyyy
                else if(format_array[i] == "yyyy"){
                    return_date += this.date.getFullYear()
                }
                //if format is HH
                else if(format_array[i] == "HH"){
                    return_date += this.date.getHours()
                }
                //if format is hh
                else if(format_array[i] == "hh"){
                    var hours = this.date.getHours()
                    if(hours > 12) hours = hours - 12
                    //with leading zero
                    if(hours < 10) return_date += "0" + hours
                    else return_date += hours
                }
                //if format is h
                else if(format_array[i] == "h"){
                    var hours = this.date.getHours()
                    if(hours > 12) hours = hours - 12
                    return_date += hours
                }
                
                //if format is mm
                else if(format_array[i] == "mm"){
                    //with leading zero
                    if(this.date.getMinutes() < 10) return_date += "0" + this.date.getMinutes()
                    else return_date += this.date.getMinutes()

                }
                
                //if format is m
                else if(format_array[i] == "m"){
                    return_date += this.date.getMinutes()         
                }
                //if format is ss
                else if(format_array[i] == "ss"){
                    return_date += this.date.getSeconds()
                }
                //if format is a
                else if(format_array[i] == "a"){
                    var hours = this.date.getHours()
                    if(hours > 12) return_date += "PM"
                    else return_date += "AM"
                }
                //if format is YYYY
                else if(format_array[i] == "YYYY"){
                    return_date += this.date.getFullYear()
                }
                //if format is d
                else if(format_array[i] == "d"){
                    return_date += this.date.getDate()
                }
                //if format is M
                else if(format_array[i] == "M"){
                    return_date += this.date.getMonth() + 1
                }
                //if format is DD
                else if(format_array[i] == "DD"){
                    var day = this.date.getDate()
                    if(day < 10) return_date += "0" + day
                    else return_date += day
                }
                //if format is not in the list
                else{
                    return_date += format_array[i]
                }

                //loop through date_patterns_available to check if this pattern available
                for(var j = 0; j < date_patterns_available.length; j++){
                    var pattern = date_patterns_available[j]
                    if(i == pattern.index){
                        //check if there is another date pattern next to this one
                        for(var k = 0; k < date_patterns_available.length; k++){
                            var pattern_index = date_patterns_available[k].index

                            if(pattern.index + 1 == pattern_index && pattern.pattern != 'EEEE'){
                                return_date += datedivider
                            }
                            
                            //if last pattern add space
                            if(date_patterns_available[date_patterns_available.length - 1].index == pattern.index) return_date += " "
                        }
                    }
                }

                //loop through date_patterns_available to check if this pattern available
                for(var j = 0; j < time_patterns_available.length; j++){
                    var pattern = time_patterns_available[j]
                    if(i == pattern.index){
                        //check if there is another date pattern next to this one
                        for(var k = 0; k < time_patterns_available.length; k++){
                            var pattern_index = time_patterns_available[k].index
                            if(pattern.index + 1 == pattern_index && time_patterns_available[k++].pattern != 'a'){
                                return_date += timedivider
                            }

                            // if(time_patterns_available[k++].pattern == 'a'){
                            //     return_date += " "
                            // }
                                                        
                            //if last pattern add space
                            if(time_patterns_available[time_patterns_available.length - 1].index == pattern.index) return_date += " "
                        }
                    }
                }


            }

            //remove the last divider
            // return_date = return_date.substring(0, return_date.length - 1)

            return_date = return_date.replace(/\s+/g, ' ').trim()


            return return_date

    }
    
}


export {timeCall}

// var timecall = new timeCall('2022/05/02 12:20').ago({
//     withtime: true,
//     timeformat:  "hh:mm",
//     json: true 
// })
// console.log(timecall)

// var timeLeft = new timeCall('2024/08/03 12:50').left({
//     withtime: true,
//     timeformat: "HH:MM:SS",
//     json: false
// })
// console.log(timeLeft)

// var timeformat = new timeCall("2021/11/03 15:2:58").format('EEEE DD MMMM YYYY HH mm', {
//     datedivider: " ",
//     timedivider: ":"
// })

// console.log(timeformat)

