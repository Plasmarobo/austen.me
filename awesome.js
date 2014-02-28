var max_words = 5;
var current_words = 0;
var next_id = 0;
var shibe_height = 375;
var shibe_width = 500;
var sexy_width = 800;
var sexy_height = 600;
var pause = false;
var current_code = 0;;
var max_code = 12;
var desc = [
	"Such",
	"Very",
	"Much",
	"Many",
	"What",
	"2 Much",
	"How",
];

var word = [
	" sexy",
	" doge attracted",
	" attract",
	" brain",
	" looks",
	" attractive",
	" stare", 
	" 4 doge",
	" love",
	" pant",
	" date 4 doge",
	" do click",
	" click",
	" mau5 here",
	" click mau5"
];

var codes = [
	'if(x == y)',
	'items.each() do |item|',
	'file.write(buffer, 32);',
	'while(1)',
	'x>>buffer[7]',
	'and(x1, x2, y)',
	'cat | grep(xzzy)',
	'x.onclick(function(){alert();}',
	'A=xB',
	'E=MC^2',
	'dBm = 20log(f) - 20log(power) - 27',
	'node = node->next',
	'queue.push(x)',
	'int main(int argc, char* arvg[])',
	'make all',
	'rake db:migrate',
	'g++ foo.cpp -o foo',
	'for(int i = 5; i < 25; ++i)',
	'module a(wire x, wire y, reg z)',
	'std::cin.get()',
	'Hello World!',
	';DROP TABLE(*);',
	'rm -rf /',
	'fork {}',
	'git add .',
	'git commit -m',
	'del *.*',
	'blob.scan(frame)',
	'return 1;',
	'exit(0)',
	'ssh home.anywhere.net',
	'Coffe!?',
	'I could use espresso',
	'V=IR',
	'i*w*L',
	'-i/w*C',
	'segfault',
	'vim x.file',
	'asdf',
	'password: guest',
	'fft = fftshift(fft(x))',
	'plot(1:m, distance)',
	'TRACEBACK.INIT',
	'sudo shutdown -h 0',
	'kill 0',
	'Battlestar galatica',
	'rails s',
	'bundle install',
	'pwd',
	'ls -l',
	'Seriously',
	'attenuation_factor = 6;',
	'#RRGGBB',
	'vertex_buffer.append(v)',
	'compile_shaders',
	'switch(PIXEL.format)',
	'#DEFINE chalk_point 660',
	'Beer?',
	'Zelda.',
	'Cloud service',
	'Bandwidth limits',
	'SCIENCE!',
	'delay(2000)',
	'loop(){}',
	'string.substring(-1)',
	'header.put("application/xml")',
	'AsyncTask()',
	'class A extends B{}',
	'class A implements C',
	'string.equals("STOP")',
	'delete [] buffer',
	'free(ptr)'
];

var colors = [
	"#FF0000",
	"#FF9933",
	"#3333FF",
	"#00CC00",
	"#FF33CC",
	"#CC33FF",
	"#FFFF00"
];

var sizes = [
	
	20,
	24,
	28,
	30,
	32
];

function random_int(limit,min)
{
	min = typeof min !== 'undefined' ? min : 0;
	return Math.floor(Math.random()*limit+min);
}


function select_word()
{
	var desc_choice = random_int(desc.length);
	var word_choice = random_int(word.length);
	var wow_chance = Math.random();
	if(wow_chance > 0.75)
		return "wow";
	else
		return desc[desc_choice] + word[word_choice];
	
}

function word_to_span(word)
{
	var color = colors[random_int(colors.length)];
	var span = $('<span />');
	$(span).attr('id', next_id);
	++next_id;
	$(span).addClass('such_word').css('color', color);
	$(span).append(word);
	$(span).css('font-size', sizes[random_int(sizes.length)]);
	return span;
}

function remove_span(span,fade_rate)
{
	$(span).animate({opacity: 0}, fade_rate, 'swing', function(){
		$(span).remove(); 
		--current_words; 
		write_next_shibe();
	});
}

 function write_next_shibe()
{
	if(!pause)
	{
		var fade_rate = Math.random()*2000+500;
		var span = word_to_span(select_word());
		++current_words;
		$('.shibe').append($(span));
		var h = $(span).height();
		var w = $(span).width();
		var max_x = shibe_width-w-32;
		var max_y = shibe_height-h-32;
		var x = random_int(max_x)+16;
		var y = random_int(max_y)+16;
		$(span).css('top',y);
		$(span).css('left',x);
		$(span).animate({opacity: 1},fade_rate, 'swing', function(){
			setTimeout(remove_span(span, fade_rate), Math.random()*10000+2000);
		});
		if(current_words < max_words)
		{	
			write_next_shibe();
		}
	}
}


function remove_code(span,fade_rate)
{
	$(span).animate({opacity: 0}, fade_rate, 'swing', function(){
		$(span).remove(); 
		--current_code; 
		write_next_code();
	});
}

function write_next_code()
{
	if(pause)
	{
		var fade_rate = Math.random()*250+250;
		var span = $('<span />');
		var code_word = Math.random() > 0.75 ? 'CODE' : codes[random_int(codes.length)];
		$(span).attr('id', next_id);
		++next_id;
		$(span).addClass('much_code');
		$(span).append(code_word);
		++current_code;
		$('.sexy').append($(span));
		var h = $(span).height();
		var w = $(span).width();
		var max_x = sexy_width-w-32;
		var max_y = sexy_height-h-32;
		var x = random_int(max_x)+16;
		var y = random_int(max_y)+16;
		$(span).css('top',y);
		$(span).css('left',x);
		$(span).animate({opacity: 1},fade_rate, 'swing', function(){
			setTimeout(remove_code(span, fade_rate), 500);
		});
		if(current_code < max_code)
		{	
			write_next_code();
		}
	}
}


function show_sexy()
{
		pause = true;
		$('.shibe').animate({
			opacity: 0, 
			height:'0%', 
			width:'0px'
		});
		$('.sexy').css('display', 'block');
		$('.sexy').animate({
			opacity: 1, 
			height: sexy_height, 
			width: sexy_width
		});
		if(current_code < max_code)
		{
			write_next_code();
		}
}
function show_doge()
{
		pause = false;
		$('.shibe').animate({
			opacity: 1, 
			height:'50%', 
			width:'500px'
		});
		$('.sexy').animate({
			opacity: 0, 
			height:0, 
			width:0
			}, 
			500, 
			'swing', 
			function(){
				$('.sexy').css('display', 'none');
			});
		if(current_words < max_words)
		{
			write_next_shibe();
		}
}