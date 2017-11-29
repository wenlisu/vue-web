<template>
    <div>
        <div class="popup-header">
            <span class="popup-title"></span>
            <select v-model="selectedDepartment" @change="onChangeDeparment()">
            </select>
            <span>选择数据展示时间</span>
            <select v-model="selectedDayRange" @change="onChangeStatisticDateRange()">
            </select>
        </div>
        <div>
            <span>研发部：56单</span>
            <button>导出数据</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>乘车人</th>
                        <th>起点</th>
                        <th>终点</th>
                        <th>出发时间</th>
                        <th>结束时间</th>
                        <th>司机</th>
                        <th>车辆</th>
                        <th>评分</th>
                        <th>里程(km)</th>
                        <th>时长(h)</th>
                        <th>路径</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders">
                        <td>乘车人</td>
                        <td>起点</td>
                        <td>终点</td>
                        <td>出发时间</td>
                        <td>结束时间</td>
                        <td>司机</td>
                        <td>车辆</td>
                        <td>评分</td>
                        <td>里程(km)</td>
                        <td>时长(d)</td>
                        <td>路径</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="less" scoped>
</style>
