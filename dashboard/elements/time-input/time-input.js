Polymer({
    is: 'time-input',
    properties: {
        invalid: {
            reflectToAttribute: true,
            type: Boolean,
            value: false
        },
        value: {
            notify: true,
            type: String
        },
        _minutes: {
            type: Number
        },
        _seconds: {
            type: Number
        },
        validator: {
            type: String,
            value: 'time-validator'
        }
    },
    // @ts-ignore
    behaviors: [
        Polymer.IronValidatableBehavior
    ],
    observers: [
        '_computeValue(_minutes,_seconds)'
    ],
    setMS(m, s) {
        this._minutes = m < 10 ? `0${m}` : m;
        this._seconds = s < 10 ? `0${s}` : s;
    },
    _computeValue(minutes, seconds) {
        this.value = `${minutes}:${seconds}`;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWUtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxDQUFDO0lBQ1AsRUFBRSxFQUFFLFlBQVk7SUFFaEIsVUFBVSxFQUFFO1FBQ1gsT0FBTyxFQUFFO1lBQ1Isa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxLQUFLO1NBQ1o7UUFFRCxLQUFLLEVBQUU7WUFDTixNQUFNLEVBQUUsSUFBSTtZQUNaLElBQUksRUFBRSxNQUFNO1NBQ1o7UUFFRCxRQUFRLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTTtTQUNaO1FBRUQsUUFBUSxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07U0FDWjtRQUVELFNBQVMsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGdCQUFnQjtTQUN2QjtLQUNEO0lBRUQsYUFBYTtJQUNiLFNBQVMsRUFBRTtRQUNWLE9BQU8sQ0FBQyx1QkFBdUI7S0FDL0I7SUFFRCxTQUFTLEVBQUU7UUFDVixrQ0FBa0M7S0FDbEM7SUFFRCxLQUFLLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlLEVBQUUsT0FBZTtRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRCxDQUFDLENBQUMifQ==