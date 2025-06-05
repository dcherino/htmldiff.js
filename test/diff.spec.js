describe('Diff', function(){
    var cut, res, html_to_tokens, calculate_operations;
  
    beforeEach(function(){
      cut = require('../js/htmldiff');
      html_to_tokens = cut.htmlToTokens;
      calculate_operations = cut.calculateOperations;
    });
  
    describe('When both inputs are the same', function(){
      beforeEach(function(){
        res = cut('input text', 'input text');
      });
  
      it('should return the text', function(){
        expect(res).toBe('input text');
      });
    }); // describe('When both inputs are the same')
  
    describe('When a letter is added', function(){
      beforeEach(function(){
        res = cut('input', 'input 2');
      });
  
      it('should mark the new letter', function(){
        expect(res).toBe('input<ins data-operation-index="1"> 2</ins>');
      });
    }); // describe('When a letter is added')
  
    describe('Whitespace differences', function(){
      it('should collapse adjacent whitespace', function(){
        expect(cut('Much \n\t    spaces', 'Much spaces')).toBe('Much spaces');
      });
  
      it('should consider non-breaking spaces as equal', function(){
        expect(cut('Hello&nbsp;world', 'Hello&#160;world')).toBe('Hello&#160;world');
      });
  
      it('should consider non-breaking spaces and non-adjacent regular spaces as equal', function(){
        expect(cut('Hello&nbsp;world', 'Hello world')).toBe('Hello world');
      });
    }); // describe('Whitespace differences')
  
    describe('When a class name is specified', function(){
      it('should include the class in the wrapper tags', function(){
        expect(cut('input', 'input 2', 'diff-result')).toBe(
          'input<ins data-operation-index="1" class="diff-result"> 2</ins>');
      });
    }); // describe('When a class name is specified')

    function expectSingleOperation(beforeHtml, afterHtml, expectedAction) {
      var before = html_to_tokens(beforeHtml);
      var after = html_to_tokens(afterHtml);
      var ops = calculate_operations(before, after);
      expect(ops).toEqual([
        {
          action: expectedAction,
          startInBefore: 0,
          endInBefore: 0,
          startInAfter: 0,
          endInAfter: 0,
        },
      ]);
    }
  
    describe('Image Differences', function(){
      it('show two images as different if their src attributes are different', function() {
        expectSingleOperation('<img src="a.jpg">', '<img src="b.jpg">', 'replace');
      });

      it('should show two images are the same if their src attributes are the same', function() {
        expectSingleOperation('<img src="a.jpg">', '<img src="a.jpg" alt="hey!">', 'equal');
      });
    }); // describe('Image Differences')
    
    describe('Widget Differences', function(){
      it('show two widgets as different if their data attributes are different', function() {
        expectSingleOperation('<object data="a.jpg"></object>', '<object data="b.jpg"></object>', 'replace');
      });

      it('should show two widgets are the same if their data attributes are the same', function() {
        expectSingleOperation('<object data="a.jpg"><param>yo!</param></object>', '<object data="a.jpg"></object>', 'equal');
      });
    }); // describe('Widget Differences')
  
    describe('Math Differences', function(){
      it('should show two math elements as different if their contents are different', function() {
        expectSingleOperation(
          '<math data-uuid="55784cd906504787a8e459e80e3bb554"><msqrt><msup><mi>b</mi><mn>2</mn></msup></msqrt></math>',
          '<math data-uuid="55784cd906504787a8e459e80e3bb554"><msqrt><msup><mi>b</mi><mn>5</mn></msup></msqrt></math>',
          'replace'
        );
      });

      it('should show two math elements as the same if their contents are the same', function() {
        expectSingleOperation(
          '<math data-uuid="15568cd906504876548459e80e356878"><msqrt><msup><mi>b</mi><mn>2</mn></msup></msqrt></math>',
          '<math data-uuid="55784cd906504787a8e459e80e3bb554"><msqrt><msup><mi>b</mi><mn>2</mn></msup></msqrt></math>',
          'equal'
        );
      });
    }); // describe('Math Differences')
  
    describe('Video Differences', function(){
      it('show two widgets as different if their data attributes are different', function() {
        expectSingleOperation(
          '<video data-uuid="0787866ab5494d88b4b1ee423453224b"><source src="inkling-video:///big_buck_bunny/webm_high" type="video/webm" /></video>',
          '<video data-uuid="0787866ab5494d88b4b1ee423453224b"><source src="inkling-video:///big_buck_rabbit/mp4" type="video/webm" /></video>',
          'replace'
        );

      });

      it('should show two widgets are the same if their data attributes are the same', function() {
        expectSingleOperation(
          '<video data-uuid="65656565655487787484545454548494"><source src="inkling-video:///big_buck_bunny/webm_high" type="video/webm" /></video>',
          '<video data-uuid="0787866ab5494d88b4b1ee423453224b"><source src="inkling-video:///big_buck_bunny/webm_high" type="video/webm" /></video>',
          'equal'
        );
      });
    }); // describe('Video Differences')
  
    describe('iframe Differences', function(){
      it('show two widgets as different if their data attributes are different', function() {
        expectSingleOperation('<iframe src="a.jpg"></iframe>', '<iframe src="b.jpg"></iframe>', 'replace');
      });

      it('should show two widgets are the same if their data attributes are the same', function() {
        expectSingleOperation('<iframe src="a.jpg"></iframe>', '<iframe src="a.jpg" class="foo"></iframe>', 'equal');
      });
    }); // describe('iframe Differences')
    
  }); // describe('Diff')