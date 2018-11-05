window.addEventListener('load', () => {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWUtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsT0FBTyxDQUFDO1FBQ1AsRUFBRSxFQUFFLFlBQVk7UUFFaEIsVUFBVSxFQUFFO1lBQ1gsT0FBTyxFQUFFO2dCQUNSLGtCQUFrQixFQUFFLElBQUk7Z0JBQ3hCLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxLQUFLO2FBQ1o7WUFFRCxLQUFLLEVBQUU7Z0JBQ04sTUFBTSxFQUFFLElBQUk7Z0JBQ1osSUFBSSxFQUFFLE1BQU07YUFDWjtZQUVELFFBQVEsRUFBRTtnQkFDVCxJQUFJLEVBQUUsTUFBTTthQUNaO1lBRUQsUUFBUSxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2FBQ1o7WUFFRCxTQUFTLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLGdCQUFnQjthQUN2QjtTQUNEO1FBRUQsYUFBYTtRQUNiLFNBQVMsRUFBRTtZQUNWLE9BQU8sQ0FBQyx1QkFBdUI7U0FDL0I7UUFFRCxTQUFTLEVBQUU7WUFDVixrQ0FBa0M7U0FDbEM7UUFFRCxLQUFLLENBQUMsQ0FBUyxFQUFFLENBQVM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFlLEVBQUUsT0FBZTtZQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3RDLENBQUM7S0FDRCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9