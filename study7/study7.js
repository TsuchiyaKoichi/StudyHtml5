(function(){

	// 変数をバインド このコードは動作しない→バインドするにはオブジェクトである必要がある
	// var name = 'Bob';
	// ko.applyBindings(name);

	// 同じElementに対して行うことのできるバインドは1回のみ

	// 第2引数指定無しの場合はdocument全体が対象となる(今回はセクションごとに複数検証するページにするためコメントアウト)
	//ko.applyBindings(model);

	// ============================================================
	// [Section1]オブジェクトをバインド
	// ============================================================
	var model1 = { name: 'Tom' };
	ko.applyBindings(model1, document.getElementById('section1'));

	// ============================================================
	// [Section2]異なるElementで同じ名称をバインドしてみる
	// ============================================================
	var model2 = { name: 'Sum' };
	ko.applyBindings(model2, document.getElementById('section2'));

	// ============================================================
	// [Section3]Observableモデルをバインドする
	// ============================================================
	var model3 =  {
		name: ko.observable('Luffy')
	};
	ko.applyBindings(model3, document.getElementById('section3'));

	// 名前変更処理
	var target = document.getElementById('btnSetName');
	target.addEventListener('click', function(){
		model3.name(document.getElementById('myName').value);
	});

	// subscribeを使用すると変更監視をできる
	model3.name.subscribe(function(newValue) {
		console.log('新しい値を取得しました：' + newValue);
	});

	// ============================================================
	// [Section4]配列をバインドする
	// ============================================================
	var model4 = {
		persons: ko.observableArray([
			{name: 'Zoro', age: 19 },
			{name: 'Usoppu', age: 16 },
			{name: 'Sanji', age: 21 }
		])
	}
	ko.applyBindings(model4, document.getElementById('section4'));

	// ============================================================
	// [Section5]ComputedObservableを利用する
	// ============================================================
	var Model5 = function() {
		var self = this;

		self.firstName = ko.observable('Koichi');
		self.lastName = ko.observable('Tsuchiya');

		self.fullName = ko.computed(function() {
			return self.firstName() + ' ' + self.lastName();
		});

		// 依存チェーン→firstNameかlastNameが変更されるとこのnameLengthも更新される
		self.nameLength = ko.computed(function() {
			return self.fullName().replace(' ', '').length;
		});

		// 拡張(notifyを試す)
		self.fullName2 = ko.pureComputed(function() {
			return self.firstName() + ' ' + self.lastName();
		}).extend({ notify: 'always' });

		self.fullName.subscribe(function() {
			console.log('fullNameが変更を受け付けました');
		});
		self.fullName2.subscribe(function() {
			console.log('fullName2が変更を受け付けました');
		});

		// 拡張(rateLimitを試す)
		self.fullName3 = ko.pureComputed(function() {
			return self.firstName() + ' ' + self.lastName();
		}).extend({ rateLimit: 1000 });

		// 関数でも記述できる(data-bind側にカッコが必要になる)
		self.fullName4 = function(){
			return  self.firstName() + ' ' + self.lastName();
		};
	}
	var model5 = new Model5();
	ko.applyBindings(model5, document.getElementById('section5'));

	var btnFirstName = document.getElementById('btnFirstName');
	btnFirstName.addEventListener('click', function() {
		model5.firstName(document.getElementById('firstName').value);
	});

	var btnLastName = document.getElementById('btnLastName');
	btnLastName.addEventListener('click', function() {
		model5.lastName(document.getElementById('lastName').value);
	});

	// notifyが効かない?
	// fullName4の意味は？UIの中で使用したいだけの場合とは(?)
	// pureComputedの意味は?


	// ============================================================
	// [Section6]テキスト及び表現
	// ============================================================
	var Model6 = function() {
		var self = this;
		self.enableDisp = ko.observable(false);

		self.sampleText = "テキストの表示";
		self.sampleText2 = function() {
			return "関数でも処理できる" + (self.enableDisp() ? 'TRUE' : 'FALSE');
		};

		self.sampleHtml = "<a href='javascript:alert(true)'>HTMLをレンダリング</a>";

		self.sale = ko.observable(10);
		self.enableBold = ko.observable(false);

		self.myColor = ko.observable();
		self.onRed = function() {
			self.myColor("span-red");
		};
		self.onBlue = function() {
			self.myColor("span-blue");
		};
		self.onGreen = function() {
			self.myColor("span-green");
		};

		self.dispSale = ko.computed(function(){
			return "javascript:alert('" + self.sale() + "')"
		});
	};
	var model6 = new Model6();
	ko.applyBindings(model6, document.getElementById('section6'));
}())