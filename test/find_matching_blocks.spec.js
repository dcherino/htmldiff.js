describe('findMatchingBlocks', function(){
    var diff, cut, res, createToken, tokenize, createSegment, htmlToTokens;

    beforeEach(function(){
        diff = require('../js/htmldiff');
        createSegment = diff.findMatchingBlocks.createSegment;
        htmlToTokens = diff.htmlToTokens;
        createToken = diff.findMatchingBlocks.createToken;
        tokenize = function(tokens){
            return tokens.map(function(token){
                return createToken(token);
            });
        };
    });

    describe('createMap', function(){
        beforeEach(function(){
            cut = diff.findMatchingBlocks.createMap;
        });

        it('should be a function', function(){
            expect(typeof cut).toBe('function');
        });

        describe('When the items exist in the search target', function(){
            beforeEach(function(){
                res = cut(tokenize(['a', 'apple', 'has', 'a', 'worm']));
            });

            it('should find "a" twice', function(){
                expect(res['a'].length).toBe(2);
            });

            it('should find "a" at 0', function(){
                expect(res['a'][0]).toBe(0);
            });

            it('should find "a" at 3', function(){
                expect(res['a'][1]).toBe(3);
            });

            it('should find "has" at 2', function(){
                expect(res['has'][0]).toBe(2);
            });
        });
    });

    describe('findBestMatch', function(){
        var invoke;

        beforeEach(function(){
            cut = diff.findMatchingBlocks.findBestMatch;
            invoke = function(before, after){
                var segment = createSegment(before, after, 0, 0);

                res = cut(segment);
            };
        });

        describe('When there is a match', function(){
            beforeEach(function(){
                var before = tokenize(['a', 'dog', 'bites']);
                var after = tokenize(['a', 'dog', 'bites', 'a', 'man']);
                invoke(before, after);
            });

            it('should match the match', function(){
                expect(res).toBeDefined();
                expect(res.startInBefore).toBe(0);
                expect(res.startInAfter).toBe(0);
                expect(res.length).toBe(3);
                expect(res.endInBefore).toBe(2);
                expect(res.endInAfter).toBe(2);
            });

            describe('When the match is surrounded', function(){
                beforeEach(function(){
                    before = tokenize(['dog', 'bites']);
                    after = tokenize(['the', 'dog', 'bites', 'a', 'man']);
                    invoke(before, after);
                });

                it('should match with appropriate indexing', function(){
                    expect(res).toBeDefined();
                    expect(res.startInBefore).toBe(0);
                    expect(res.startInAfter).toBe(1);
                    expect(res.endInBefore).toBe(1);
                    expect(res.endInAfter).toBe(2);
                });
            });
        });

        describe('When there is no match', function(){
            beforeEach(function(){
                var before = tokenize(['the', 'rat', 'sqeaks']);
                var after = tokenize(['a', 'dog', 'bites', 'a', 'man']);
                invoke(before, after);
            });

            it('should return nothing', function(){
                expect(res).toBeUndefined();
            });
        });
    });

    describe('findMatchingBlocks', function(){
        var segment;

        beforeEach(function(){
            cut = diff.findMatchingBlocks;
        });

        it('should be a function', function(){
            expect(typeof cut).toBe('function');
        });

        describe('When called with a single match', function(){
            beforeEach(function(){
                var before = htmlToTokens('a dog bites');
                var after = htmlToTokens('when a dog bites it hurts');
                segment = createSegment(before, after, 0, 0);

                res = cut(segment);
            });

            it('should return a match', function(){
                expect(res.length).toBe(1);
            });
        });

        describe('When called with multiple matches', function(){
            beforeEach(function(){
                var before = htmlToTokens('the dog bit a man');
                var after = htmlToTokens('the large brown dog bit a tall man');
                segment = createSegment(before, after, 0, 0);
                res = cut(segment);
            });

            it('should return 3 matches', function(){
                expect(res.length).toBe(3);
            });

            it('should match "the"', function(){
                expect(res[0].startInBefore).toBe(0);
                expect(res[0].startInAfter).toBe(0);
                expect(res[0].endInBefore).toBe(0);
                expect(res[0].endInAfter).toBe(0);
                expect(res[0].length).toBe(1);
            });

            it('should match "dog bit a"', function(){
                expect(res[1].startInBefore).toBe(1);
                expect(res[1].startInAfter).toBe(5);
                expect(res[1].endInBefore).toBe(7);
                expect(res[1].endInAfter).toBe(11);
                expect(res[1].length).toBe(7);
            });

            it('should match "man"', function(){
                expect(res[2].startInBefore).toBe(8);
                expect(res[2].startInAfter).toBe(14);
                expect(res[2].endInBefore).toBe(8);
                expect(res[2].endInAfter).toBe(14);
                expect(res[2].length).toBe(1);
            });
        });
    });
});
