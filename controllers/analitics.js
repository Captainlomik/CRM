const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')
const moment = require('moment')


module.exports.overview = async function (req, res) {
    try {
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        const allOrders = await Order.find({
            user: req.user.id
        }).sort(1)
        const ordersMap = getOrdersMap(allOrders)

        //кол-во заказов
        const totalOrdersNumber = allOrders.length
        //кол-во заказов вчера 
        const yesterdayOrdersNumber = yesterdayOrders.length
        //кол-во дней всего 
        const daysNumber = Object.keys(ordersMap).length
        //заказов в день 
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
        // Процент для кол-ва заказов 
        // ((кол-во заказов вчера / кол-во заказов в день) - 1)*100
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
        //Общая выручка   
        const totalGain = calculateGain(allOrders)
        //выручка в день 
        const gainPerDay = totalGain / daysNumber
        //Выручка за вчера 
        const yesterDayGain = calculateGain(yesterdayOrders)
        //Процент выручки 
        const gainPercent = (((yesterDayGain / gainPerDay) - 1) * 100).toFixed(2)
        //cравнение выручки
        const compareGain = (yesterDayGain - gainPerDay).toFixed(2)
        //сравнение кол-ва заказов
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterDayGain,
                isHigher: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0
            }
        })

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.analitics = function (req, res) {

}

function getOrdersMap(orders = []) {
    const daysOrder = {}

    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        if (date === moment().format('DD.MM.YYYY')) {
            return
        }
        if (!daysOrder[date]) {
            daysOrder[date] = []
        }

        daysOrder[date].push(order)
    })

    return daysOrder
}

function calculateGain(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity
        }, 0)
        return total += orderPrice
    }, 0)
}